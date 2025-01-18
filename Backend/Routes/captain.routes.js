const express = require('express');
const { body } = require('express-validator');
const captainController = require('../Controller/captain.controller');
const authMiddleware = require('../Middleware/auth.middleware');


const router = express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('Invaild Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('Fist name must be at least 3 charecter long'),
    body('password').isLength({min: 6}).withMessage('Passwod must be at least 6 charecter long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 charecter long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Please must be at least 3 charecter long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'moto', 'auto']).withMessage('Vehicle type must be one of "car", "moto", or "auto"'),
], captainController.registerCaptain);

router.post('/login',[
    body('email').isEmail().withMessage('Invaild Email'),
    body('password').isLength({min: 6}).withMessage('Passwod must be at least 6 charecter long')
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;