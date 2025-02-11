const socketIo = require('socket.io');
const userModel = require('./Models/user.model');
const captainModel = require('./Models/captain.model');

let io;

function intializeSocket(server){
    io = socketIo(server,{
        cors:{
            origine: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket)=>{
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data)=>{
            const {userId, userType} = data;
            console.log('Join event recieved: ', data); // add

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId,
                    {socketId: socket.id},
                    {new: true}
                );
                console.log(`user id is : ${userId}`); // add
            }else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId, 
                    {socketId: socket.id},
                    {new: true}
                );
                console.log(`captain id is : ${userId}`); // add
            }
        });

        socket.on('disconnect', ()=>{
            console.log(`Clinet disconnected: ${socket.id}`);
        });
    });
}

function sendMessageToSocketId(socketId, message){
    if(io){
        io.to(socketId).emit('message', message);
    }else{
        console.log('Socket.io not initialized.');
    }
}

module.exports = { intializeSocket, sendMessageToSocketId };