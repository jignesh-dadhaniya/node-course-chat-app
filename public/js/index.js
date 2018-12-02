var socket = io();

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
  var li = $('<li></li>');
  li.text(`${message.from} ${formatterTime}: ${message.txt}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formatterTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  var a  = $('<a target="_blank">My current location</a>');
  li.text(`${message.from} ${formatterTime}: `);
  a.attr('href', message.url);
  li.append(a);

  $('#messages').append(li);
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
