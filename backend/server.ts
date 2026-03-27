import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/pro-accountancy-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());

// Example API route
app.get('/api/example', (req, res) => {
    res.send('This is an example API route');
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Server listening on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
