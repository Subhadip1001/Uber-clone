const express = require('express');
const { body } = require('express-validator');
const userController = require('../Controller/user.controller');
const authMiddleware = require('../Middleware/auth.middleware');

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invaild Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('Fist name must be at least 3 charecter long'),
    body('password').isLength({min: 6}).withMessage('Passwod must be at least 6 charecter long')
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invaild Email'),
    body('password').isLength({min: 6}).withMessage('Passwod must be at least 6 charecter long')
], userController.loginUser);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;