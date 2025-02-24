const rideModel = require('../Models/ride.model');
const mapService = require('../Services/maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if(!pickup || !destination){
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;
}

module.exports.getFare = getFare;

function generateOtp(num){
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}


// module.exports.createRide = async({ user, pickup, destination, vehicleType })=>{
//     if(!user || !pickup || !destination || !vehicleType){
//         throw new Error('User, pickup, destination and vehicleType are required');
//     }

//     const fare = await getFare(pickup, destination);

//     const ride = rideModel.create({
//         user,
//         pickup,
//         destination,
//         otp: generateOtp(6),
//         fare: fare[vehicleType]
//     });

//     return ride;
// }

module.exports.createRide = async({ user, pickup, destination, vehicleType }) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination and vehicleType are required');
    }

    const fare = await getFare(pickup, destination);
    console.log('Calculated fare:', fare); // Add logging

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        vehicleType, // Add vehicleType
        otp: generateOtp(6),
        fare: fare[vehicleType], // Use the correct fare based on vehicle type
        status: 'pending'
    });

    console.log('Created ride:', ride); // Add logging
    return ride;
}

module.exports.confirmRide = async({ rideId })=>{
    if(!rideId){
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({ _id: rideId }, { 
        status: 'accepted',
        captain: captain._id
     });

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    if(!ride){
        throw new Error('Ride not found');
    }
    
    return ride;
}

module.exports.startRide = async({ rideId, otp, captain })=>{
    if(!rideId || !otp || !captain){
        throw new Error('Ride id, otp and captain are required');
    }

    const ride = await rideModel.findOne({ _id: rideId }).populate('captain').select('+otp');
    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.otp !== otp){
        throw new Error('Invalid otp');
    }

    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'started' });

    return ride;
}