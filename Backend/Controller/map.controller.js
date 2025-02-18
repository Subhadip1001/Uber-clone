const mapService = require('../Services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    // console.log("Address:", address);
    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error("Error in getCoordinates:", error.message);
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

module.exports.getDistanceTime = async(req, res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);

        return res.status(200).json(distanceTime);
    } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Internal Server error' }); 
    }
}

module.exports.getAutoCompleteSuggestions = async(req, res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server error' }); 
    }
}