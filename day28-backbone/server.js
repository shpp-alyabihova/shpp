
var bd = [];

var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname));
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/add', function(req, res) {
    var new_msg = req.body.new_msg;
    db.push(new_msg);
});

var server = app.listen(8081, function() {
    console.log('Running on http://localhost:8081');
});