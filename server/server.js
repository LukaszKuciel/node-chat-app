const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chap app.'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat.'));

    socket.on('createMessage', (msg, callback) => {
        console.log('Create message', msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback('This is from the server.');
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});