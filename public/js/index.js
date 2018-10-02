var socket = io();

//when new message come to the user i will move the scroll panel to the bottom
//please check the sreenshoots 4,5,6 to understand the Heights
function scrollToBottom () {
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');  //the message which is just added

  //Heights
  var clientHeight = messages.prop('clientHeight');  //prop() is function to get some properties throw the user browser
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);  //scrollTop() jQuery function to scroll to the specific place
  }
}

socket.on('connect', function () {
  console.log('Connected to sever');

});

socket.on('disconnect', function (message) {
  console.log('disconected from server');
});

socket.on('newMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');

  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

});

socket.on('newLocationMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formatedTime,
    url: message.url
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox =  jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled').text('Send location');

      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude ,
        longitude: position.coords.longitude
      });
  }, function () {
      locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location.');
  });

});
