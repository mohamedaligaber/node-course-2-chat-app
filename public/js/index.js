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
  var li = jQuery('<li></li>');  //creating html element by jQuery
  li.text(`${message.from}: ${message.text} `);

  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {   //e is event object
    e.preventDefault();   //the submit event is refreshing the page and the preventDefault() function prevents this event from occur

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
       //no implementation right now for acknowledgemenet
    });
});
