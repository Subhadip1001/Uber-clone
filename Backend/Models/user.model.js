const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'Fist name must be at least 3 charecter long']
        },
        lastname:{
            type: String,
            minlength: [3, 'Fist name must be at least 3 charecter long']
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [6, 'Email must be at least 6 charecter long']
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketId:{
        type: String
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{ expiresIn: '24h'});
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;