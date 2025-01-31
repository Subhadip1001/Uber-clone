import React, { createContext, useEffect } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

const SocketProvider = ({ children })=>{
    useEffect(()=>{
        socket.on('connect', ()=>{
            console.log('Connected to server');
        });

        socket.on('disconnect', ()=>{
            console.log('Disconnect from server');
        });
    }, []);

    const sendMessage = (eventName, message)=>{
        socket.emit(eventName, message);
    }

    const receiveMessage = (eventname, callback)=>{
        socket.on(eventname, callback);
    }

    // return () => {
    //     socket.off('connect');
    //     socket.off('disconnect');
    // };

    return (
        <SocketContext.Provider value={{ sendMessage, receiveMessage}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;