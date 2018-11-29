const path = require('path');
const http = require('http');
const express = require('express');
const socketIO  = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port       = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io     = socketIO(server);

io.on('connection', (socket) => {
	console.log('New user connected');

  socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app',
		createAt: 123
	});

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		txt: 'New user joined',
		createdAt: new Date().getTime()
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);

		io.emit('newMessage', {
			from: message.from,
			txt: message.text,
			createdAt: new Date().getTime()
		});
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	txt: message.txt,
		// 	createdAt: new Date().getTime()
		// });
	})

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});


app.use(express.static(publicPath));

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
