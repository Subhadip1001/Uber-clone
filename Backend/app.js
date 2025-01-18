const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectToDB = require('./DB/db');
const userRoutes = require('./Routes/user.routes')
const captainRoutes = require('./Routes/captain.routes');
const mapsRoutes = require('./Routes/maps.routes');
const rideRoutes = require('./Routes/ride.routes');


connectToDB();
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser())

app.get('/', (req,res)=>{
    res.send('Hello world');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

module.exports = app;