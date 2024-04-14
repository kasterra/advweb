import socketio from "socket.io-client";
import React from 'react';

export const socket = socketio.connect('http://34.118.157.109');
export const SocketContext = React.createContext();