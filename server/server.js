
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

    socket.emit('newMessage', {
      from: 'ali',
      text: 'See you then.',
      craetedAt: 121232
    });

    socket.on('createMessage', (message) => {
        console.log('Create message: ', message);
    });

    socket.on('disconnect', () => {
        console.log('User was disconected');
    });
});


app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Sevrer is up on ${PORT} port`);
});
