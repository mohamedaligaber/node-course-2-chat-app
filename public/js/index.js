var socket = io();

socket.on('connect', function () {
  console.log('Connected to sever');

  //we will emit event "createMessage"  from the console of our browser: socket.emit('createMessage', {from: 'mohamed', text: 'Hi I am mohamed'});
});

socket.on('disconnect', function (message) {
  console.log('disconected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage : ', message);
});
