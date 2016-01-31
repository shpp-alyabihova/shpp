var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};
var id_msg = 0;

var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '192.168.88.246',
    database: 'socket_msg',
    user: 'root',
    password: 'v0hlfirf'
});

function dataSetToBD(posts) {
    var id;
    pool.getConnection(function (err, connection) {
        var post = {user_id: posts.user_id, username: posts.user, text_msg: posts.message};
        var query = connection.query('INSERT INTO messages SET ?', post, function(err, ressult){
            connection.release;
        });
        id_msg++;
        console.log(query);
    });
    pool.getConnection(function (err, connection) {
        id = connection.query('SELECT MAX(id) FROM messages', function(err, ressult) {
            connection.release;
        });
    });
    return id;
}

function dataGetFromBD(id) {
    var query;
    var limit = ((id - 10) < 0) ? 0 : id++ ;
    pool.getConnection(function (err, connection) {
        query = connection.query('SELECT * FROM messages WHERE id BETWEEN ? AND ? ORDER BY id DESC', [id, limit], function(err, ressult){
            connection.release;
        });
    });
    return query;
}

function packsData(data, id) {
    var data_package = [];
    for (var i = 0; i < data.length; i++) {
        var msg = {};
        msg.id = data[i].id_msg;
        msg.text = text_msg;
        if (data[i].user_id == id)
            msg.author = 'you';
        else
            msg_author = data[i].username;
        data_package.push(msg);
    }
    return JSON.stringify(data_package);
}

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
        var id = dataSetToBD({user_id: socket.id, user: users[socket.id], message: msg});
        socket.broadcast.emit('new message', users[socket.id], msg, id);
        socket.emit('own message', msg, id);
    });
    socket.on('ask history', function (id) {
        var dataArray = dataGetFromBD(id);
        socket.emit('load history', packsData(dataArray, socket.id));
    });
});

http.listen(8081, function(){
  console.log('listening on :8081');
});
