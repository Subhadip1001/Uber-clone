const captainModel = require('../Models/captain.model');
const captainService = require('../Services/captain.service');
const { validationResult } = require('express-validator');
const {hashPassword} = require('../Utils/password.util');
const blacklistTokenModel = require('../Models/blacklistToken.model');

module.exports.registerCaptain = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // console.log(vehicle);

    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({ message: 'Captain already exist' })
    }

    const hashedPassword = await hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain});
}

module.exports.loginCaptain = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const{email, password} = req.body;
    // console.log(req.body);

    const findCaptain = await captainModel.findOne({email}).select('+password');
    if(!findCaptain){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await findCaptain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invaild email or password'});
    }

    const token = findCaptain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, findCaptain});
}

module.exports.getCaptainProfile = async(req, res)=>{
    if (!req.captain) {
        return res.status(404).json({ message: 'Captain profile not found' });
    }
    res.status(200).json({captain: req.captain});
}

module.exports.logoutCaptain = async(req, res)=>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.clearCookie('token');

    res.status(200).json({message: 'Logout successfuly'});
}

