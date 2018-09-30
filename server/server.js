
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');


const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname + '/../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

//acknowledgemenet means when the user or the server emits an event he didn't know if the event successfully emited to the other side or not, so acknowledgemenet is a
//reply message from the listener to the eniter that every thing goes well.


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat') );

    socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined the chat') );


    socket.on('createMessage', (message, callBack) => {  //here i defined a callBack function which will be called to acknowledge the client
        console.log('Create message: ', message);

        io.emit('newMessage', generateMessage(message.from,  message.text) );

        callBack('acknowledgemenet message from server!');
        //socket.broadcast.emit('newMessage', generateMessage(message.from,  message.text) );
    });

    socket.on('disconnect', () => {
        console.log('User was disconected');
    });
});


app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Sevrer is up on ${PORT} port`);
});
