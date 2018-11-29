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

socket.on('newMessage', function (data) {
  console.log('newMessage', data);
});
