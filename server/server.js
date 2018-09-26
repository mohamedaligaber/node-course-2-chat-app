//in web sockets the client initiate connection with server and when the connection is opened the both client and server will send data back and forward throw
//will establish that throw pakcage in node.js called websocket, this package has the both utilities to handle client code(frontend) and server code(backend)
//install web socket "npm install socket.io --save"
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname + '/../public');

var app = express();
var server = http.createServer(app);  //http is pure node.js web server and express framework use this module(http) behind the scene, i replcaed express app()
//http server because http module will allows us to use socket IO

var io = socketIO(server);  //by calling socketIO function and pass server as parameter now we have IO server referenced by variable (io)
//after this line now we has a server which can accept any socket io connection with clients and a new route "localhost:port_number/socket.io/socket.io.js" which contains the whole code to for socket io handling(back and front)

//email app socket io scenario (emit(server) and listen(client) events) : 1)email server receive new mail for a user ,
//email server emit this event to the user(client app). //2)client listen to this event.
//this scenario can be vesa versa , client make new message and emit this event to server and server listen to this event.


//socket io has many events one of this is connection()  which accpet connection establishment with client
io.on('connection', (socket) => {    //this socket argument is like the socket variable of file index.html, it maintians the connection with all clients connected to this socket
    console.log('New user connected');   //every browser tab opened on client index page "localhost:3000" or "localhost:3000/index.html" this message will be printed

    socket.on('disconnect', () => {  //the socket variable is accessed of inside this function only on server side
        console.log('User was disconected');
    });
});


app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Sevrer is up on ${PORT} port`);
});
