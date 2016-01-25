var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('disconnect', function () {
        io.sockets.emit('update', users[socket.id] + ' disconnected');
        delete users[socket.id];
    });

    socket.on('new user', function (name) {
        users[socket.id] = name;
        socket.emit('update', "You've connected to server");
        socket.broadcast.emit('update', name + ' join in with us');
    });

    socket.on('chat message', function (msg) {
        socket.broadcast.emit('new message', users[socket.id], msg);
        socket.emit('own message', msg);
    });
});

http.listen(8081, function(){
  console.log('listening on :8081');
});
