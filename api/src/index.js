var http = require('http');

// Send index.html to all requests
var app = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('string');
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);


function sendMessage(socketId) {
    return function (data) {
        const emitData = {
            content: data,
            authorId: socketId,
            date: new Date().getTime(),
        }
        io.emit('message', emitData);
    };
}

// Emit welcome message on connection
io.on('connection', function (socket) {
    console.log('New connection: ', socket.id);

    socket.emit('init', { id: socket.id });
    socket.on('message', sendMessage(socket.id));
});

app.listen(3000);