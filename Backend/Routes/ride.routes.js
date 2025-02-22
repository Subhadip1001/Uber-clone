const express = require('express');
const { body, query } = require('express-validator');
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

router.get('/get-fare',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

module.exports = router;