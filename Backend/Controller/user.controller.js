const userModel = require('../Models/user.model');
const userService = require('../Services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../Models/blacklistToken.model');
const { hashPassword } = require('../Utils/password.util');

module.exports.registerUser = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist){
        return res.status(400).json({ message: 'User already exist'});
    }

    const hashedPassword = await hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

module.exports.loginUser = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const findUser = await userModel.findOne({email}).select('+password');
    if(!findUser){
        return res.status(401).json({ message: 'Invaild email or password' });
    }
    
    const isMatch = await findUser.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({ message: 'Invaild email or password' });
    }

    const token = findUser.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, findUser });
}

module.exports.getUserProfile = async(req, res)=>{
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.logoutUser = async(req, res)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.status(200).json({ message: 'Logged out' });
}