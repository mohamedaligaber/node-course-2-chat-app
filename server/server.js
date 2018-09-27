
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname + '/../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);


io.on('connection', (socket) => {
    console.log('New user connected');

    //challenge
    socket.emit('newMessage', {
      form: 'admin',
      text: 'Welcome to the chat',
      createdAt: new Date().getTime()
    });

    //challenge
    socket.broadcast.emit('newMessage', {
      form: 'admin',
      text: 'New user joined the chat',
      createdAt: new Date().getTime()
    });


    //now i can open multible browser tabs and see when i send message from the console of one tab it will be sent to the console of other tabs
    //we will emit event "createMessage"  from the console of our browser: socket.emit('createMessage', {from: 'mohamed', text: 'Hi I am mohamed'});
    socket.on('createMessage', (message) => {
        console.log('Create message: ', message);

        /*
        io.emit('newMessage', {
          from: message.from,
          text: message.text,
          createdAt: new Date().getTime()
        });    //io handle all connections and emits events to all connections but socket emit event and handle one single connection
        */

        //in the previous example the message with i have emit to the server the server will emit it to the all sockets and me too io.emit()
        //the next example the server will emit the message for all sockets except the emmitter for this message
        socket.broadcast.emit('newMessage', {
          from: message.from,
          text: message.text,
          createdAt: new Date().getTime()
        });

        //we test this events by run this statement "socket.emit('createMessage', {from : 'mohamed', text: 'Hi imam mohamed'} );" from console of browser tab, and see the event emitted to another browser tabs

    });

    socket.on('disconnect', () => {
        console.log('User was disconected');
    });
});


app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Sevrer is up on ${PORT} port`);
});
