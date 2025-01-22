const userModel = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../Models/blacklistToken.model');
const captainModel = require('../Models/captain.model');

module.exports.authUser = async(req, res, next)=>{
    // console.log("Headers:", req.headers);
    // console.log("Cookies:", req.cookies);
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log(token)
    if(!token){
        return res.status(401).json({ message: 'Unauthorized: No token provided'});
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token: token});
    if(isBlacklisted){
        // console.log("Blacklisted Token:", token);
        res.status(401).json({ message: 'Unauthorized: Token blacklisted'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded Token:", decoded);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            console.log("User not found for ID:", decoded._id);
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token'});
        console.error(error.message);
    }
}

module.exports.authCaptain = async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: 'Unauthorized'});
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token: token});

    if(isBlacklisted){
        res.status(401).json({ message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Unauthorized'});
    }
}