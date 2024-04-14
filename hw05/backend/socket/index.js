import { Server } from "socket.io";
import chatHandler from './handlers/chatHandler.js';
import sessionHandler from './handlers/sessionHandler.js';

export default (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Delegate to handlers
        chatHandler(io, socket);
        sessionHandler(io, socket);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            // Handle disconnection
        });
    });
};
