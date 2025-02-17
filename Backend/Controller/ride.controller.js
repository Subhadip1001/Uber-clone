const rideService = require("../Services/ride.service");
const { validationResult } = require("express-validator");
const mapsService = require("../Services/maps.service");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { pickup, destination, vehicleType } = req.body;

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

    console.log("captain in radious" + captainsInRadius);

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
