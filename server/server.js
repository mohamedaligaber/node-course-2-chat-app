
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

    //now i can open multible browser tabs and see when i send message from the console of one tab it will be sent to the console of other tabs
    //we will emit event "createMessage"  from the console of our browser: socket.emit('createMessage', {from: 'mohamed', text: 'Hi I am mohamed'});
    socket.on('createMessage', (message) => {
        console.log('Create message: ', message);

        io.emit('newMessage', {
          from: message.from,
          text: message.text,
          createdAt: new Date().getTime()
        });    //io handle all connections and emits events to all connections but socket emit event and handle one single connection
    });

    socket.on('disconnect', () => {
        console.log('User was disconected');
    });
});


app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Sevrer is up on ${PORT} port`);
});
