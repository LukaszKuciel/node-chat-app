const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.')
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUsersList', users.getUsersList(params.room));
        socket.emit('newMessage', generateMessage('Admin', `Welcome to the ${params.room} chat room.`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });

    socket.on('createMessage', (msg, callback) => {
        let user = users.getUser(socket.id);

        if(user && isRealString(msg.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name , coords.lat, coords.lng));
        }
    });
    
    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});