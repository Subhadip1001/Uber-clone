const rideService = require("../Services/ride.service");
const { validationResult } = require("express-validator");
const mapsService = require("../Services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../Models/ride.model");

// module.exports.createRide = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
  
//   const { userId, pickup, destination, vehicleType } = req.body;
//   try {
//     const ride = await rideService.createRide({
//       user: req.user._id,
//       pickup,
//       destination,
//       vehicleType,
//     });
//     res.status(201).json(ride);

//     const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
//     console.log(pickupCoordinates);

//     const captainsInRadius = await mapsService.getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 2);
//     console.log(captainsInRadius);

//     ride.otp = "";

//     const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

//     captainsInRadius.map(async (captain) => {
//       console.log(captain, ride);
//       sendMessageToSocketId(captain.socketId, {
//         event: 'new-ride',
//         data: rideWithUser 
//       });
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports.createRide = async (req, res) => {
  try {
      const { pickup, destination, vehicleType } = req.body;

      // Create the ride first
      const ride = await rideService.createRide({
          user: req.user._id,
          pickup,
          destination,
          vehicleType,
      });

      // Get pickup coordinates
      const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
      console.log('Pickup coordinates:', pickupCoordinates);

      // Find nearby captains
      const captainsInRadius = await mapsService.getCaptainsInTheRadius(
          pickupCoordinates.lat,
          pickupCoordinates.lng,
          2, // 2km radius
          vehicleType // Add vehicle type filter
      );

      console.log('Captains in radius:', captainsInRadius);

      if (captainsInRadius.length > 0) {
          // Notify each captain about the new ride
          const rideWithUser = await rideModel.findOne({ _id: ride._id })
              .populate('user')
              .select('+otp');

          captainsInRadius.forEach(captain => {
              sendMessageToSocketId(captain.socketId, {
                  event: 'new-ride',
                  data: rideWithUser
              });
          });
      }

      res.status(201).json(ride);
  } catch (error) {
      console.error('Error creating ride:', error);
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

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  const { otp } = req.query;

  try {
    const ride = await rideService.startRide({ rideId, otp, captain: req.captain._id });
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-started',
      data: ride
    });

    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
