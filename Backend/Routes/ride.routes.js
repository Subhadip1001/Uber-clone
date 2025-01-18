const express = require('express');
const { body } = require('express-validator');
const rideController = require('../Controller/ride.controller');
const authMiddleware = require('../Middleware/auth.middleware');

const router = express.Router();

router.post('/create', 
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invaild pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invaild destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    rideController.createRide
);

module.exports = router;