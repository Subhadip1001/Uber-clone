const axios = require('axios');
const captainModel = require('../Models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    // console.log("Request URL:", url);

    try {
        const response = await axios.get(url);
        // console.log("Response Data:", response.data);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        throw error;
    }
}

module.exports.getDistanceTime = async(origin, destination)=>{
    if(!origin || !destination){
        throw new Error('Origin and Destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            if(response.data.rows[ 0 ].elements[ 0 ] === 'ZERO_RESULTS'){
                throw new Error('No routes found')
            }
            return response.data.rows[ 0 ].elements[ 0 ];
        }else{
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.getAutoCompleteSuggestions = async(input)=>{
    if(!input){
        throw new Error('Address is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        }else{
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    if (!ltd || !lng || !radius) {
        throw new Error('Latitude, Longitude and Radius are required');
    }

    const captains = await captainModel.find({
        status: 'active',
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        },
        isOnline: true
    });

    return captains;
}