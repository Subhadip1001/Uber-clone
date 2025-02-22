const rideService = require("../Services/ride.service");
const { validationResult } = require("express-validator");
const mapsService = require("../Services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../Models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { userId, pickup, destination, vehicleType } = req.body;
  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);

    const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
    console.log(pickupCoordinates);

    const captainsInRadius = await mapsService.getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 2);
    console.log(captainsInRadius);

    ride.otp = "";

    const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

    captainsInRadius.map(async (captain) => {
      console.log(captain, ride);
      sendMessageToSocketId(captain.socketId, {
        event: 'new-ride',
        data: rideWithUser 
      });
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination} = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    res.status(200).json({ fare });
  } catch (error) {
    return res.status(500).json({ message: error.message})
  }
}

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  try {
    const ride = await rideService.confirmRide({rideId, captain: req.captain._id});
    sendMessageToSocketId(ride.user.socketId,{
      event: 'ride-confirmed',
      data: ride
    });

    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
