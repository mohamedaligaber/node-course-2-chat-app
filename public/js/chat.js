var socket = io();

function scrollToBottom () {
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params , function (error) {
      if (error) {
        alert(error);
          window.location.href = '/';  //if one of user parameters (name or room) is unvalid, i will redirect the user to the main page (index.html)
      } else {
        console.log('no errors');
      }
  });
});

socket.on('disconnect', function (message) {
  console.log('disconected from server');
});

socket.on('updateUserList', function (usersNames) {
  var ol = jQuery('<ol></ol>');

  usersNames.forEach( function (username) {
      ol.append( jQuery('<li></li>').text(username) );   //don't forget put the value of new element li throw text() function to avoid html injection
  });

  jQuery('#users').html(ol);
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
      //  from: 'User',    will comment it cause i will but the acutal user name for each message
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
