const mongoose = require('mongoose');
require('dotenv').config();

function connectToDB(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(()=>{
        console.log('Connected Database...');
    })
    .catch(err=>{
        console.log(`Error : ${err}`);
    })
}

module.exports = connectToDB;