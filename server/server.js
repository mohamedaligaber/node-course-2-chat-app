
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//install mocha and expect packages  "npm i mocha expect@1.20.2 --save-dev"
//"npm i nodemon --save-dev" we installed nodemon before globally so any one will pull our code from github will need to install it. so we installed it as dev dependency
//pattern : server/**/*.test.js  --> this pattern means inside directory called server from the root project folder, any subdirectory, any file ends by .test.js
const {generateMessage} = require('./utils/message.js');


const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname + '/../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat') );

    socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined the chat') );


    socket.on('createMessage', (message) => {
        console.log('Create message: ', message);

        socket.broadcast.emit('newMessage', generateMessage(message.from,  message.text) );
    });

    socket.on('disconnect', () => {
        console.log('User was disconected');
    });
});


app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Sevrer is up on ${PORT} port`);
});
