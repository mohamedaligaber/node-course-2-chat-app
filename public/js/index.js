var socket = io();

socket.on('connect', function () {
  console.log('Connected to sever');

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

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.form}: `);   //why i set this value throw text not in jQuery('<li></li>'), to prevent any html injection.
  a.attr('href', message.url);    //why i set this value throw attr, to prevent any html injection.
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {   //e is event object
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude ,
        longitude: position.coords.longitude
      });
  }, function () {
      alert('Unable to fetch location.');
  });

});
