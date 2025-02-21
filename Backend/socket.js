const socketIo = require('socket.io');
const userModel = require('./Models/user.model');
const captainModel = require('./Models/captain.model');

let io;

function intializeSocket(server){
    io = socketIo(server,{
        cors:{
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket)=>{
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data)=>{
            const { userId, userType } = data;

            if (!userId || !userType) {
                console.error('Missing required data:', { userId, userType });
                return;
            }

            console.log('Join event received:', { userId, userType });

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId,
                    {socketId: socket.id},
                );
            }else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId, 
                    {socketId: socket.id},
                );
            }
        });

        socket.on('update-location-captain', async (data)=>{
            const { userId, location } = data;
            if(!userId || !location){
                console.error('Missing required data:', { userId, location });
                return;
            }

            if (!location.lat || !location.lng) {
                return socket.emit('error', {message: 'Invalid location data'});
            }

            await captainModel.findByIdAndUpdate(userId, {
                location:{
                    lat: location.lat,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', ()=>{
            console.log(`Clinet disconnected: ${socket.id}`);
        });
    });
}

function sendMessageToSocketId(socketId, messageObject){
    console.log(`send message to ${socketId}`, messageObject);
    if(io){
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }else{
        console.log('Socket.io not initialized.');
    }
}

module.exports = { intializeSocket, sendMessageToSocketId };