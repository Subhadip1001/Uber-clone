const rideService = require("../Services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { pickup, destination, vehicleType } = req.body;
    // console.log("Request Body:", req.body);
    // console.log("User ID:", req.user?._id);
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    // console.log(ride);
    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
