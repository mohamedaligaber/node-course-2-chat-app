var socket = io();

socket.on('connect', function () {
  console.log('Connected to sever');

  socket.emit('createMessage', {
    from: 'mohamed',
    text: 'Hi this message from mohamed'
  });

});

socket.on('disconnect', function (message) {
  console.log('disconected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage : ', message);
});


//note: from browser conosle after render index.html page i can access any of this variables like socket and make emit event with it.
