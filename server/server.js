
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validations.js');
const {Users} = require('./utils/users.js');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname + '/../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
    console.log('New user connected');

    //there is a socket.id is element contains unique value for each socket(user) connected now on the io object.

    socket.on('join', (params, callBack) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callBack('name and room name are required');
        } else {
            callBack();  //with no error message

            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);

            //emit the new usersList to every user in this room
            io.to(params.room).emit('updateUserList', users.getUsersList(params.room) );

            socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat') );

            socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined.`) );



            //socket.leave(params.room)  to leave the room
        }
    });

    socket.on('createMessage', (message, callBack) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {   //prevent user from sending empty messages
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text) );
        }



        callBack();
    });

      socket.on('createLocationMessage',  (coords) => {
      var user = users.getUser(socket.id);

      if (user) {
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude) );
      }

    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
          io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
          io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left the chat`) );
          socket.leave(user.room);
        }

    });
});


app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Sevrer is up on ${PORT} port`);
});
