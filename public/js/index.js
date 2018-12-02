var socket = io();
function scrollToBottom() {
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop    = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    console.log('Scroll top');
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'Andrew',
  //   text: 'Hey, I am just fine'
  // });
});

socket.on('disconnect', function () {
  console.log('Discounnected from server');
});

socket.on('newMessage', function (message) {
  var formatterTime = moment(message.createdAt).format('h:mm a');
  // var li = $('<li></li>');
  // li.text(`${message.from} ${formatterTime}: ${message.txt}`);
  //
  // $('#messages').append(li);

  var template = $('#message-template').html();
  var html     = Mustache.render(template, {
    txt: message.txt,
    from: message.from,
    createdAt: formatterTime
  });

  $('#messages').append(html);

  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formatterTime = moment(message.createdAt).format('h:mm a');
  // var li = $('<li></li>');
  // var a  = $('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${formatterTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  //
  // $('#messages').append(li);
  var template = $('#location-message-template').html();
  var html     = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formatterTime
  });

  $('#messages').append(html);

  scrollToBottom();
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    txt: $('[name=message]').val()
  }, function () {
    $('[name=message]').val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    //console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

    locationButton.removeAttr('disabled').text('Send location');
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
