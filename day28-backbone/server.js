

var bd = {};

var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    //res.render();
    //express.static(__dirname + '/public');
    res.sendFile(__dirname + '/index.html');
});

app.get ('/todo/update', function (req, res) {
    var response = [];
    for (task in bd) {
        response.push(bd[task]);
    }
    res.json(response);
    res.end();
});

app.post('/todo/update/:id', function(req, res) {
    var id = req.params.id;
    var new_msg = req.body;
    console.log(new_msg);
    bd[id] = new_msg;
});

app.put('/todo/update/:id', function(req, res) {
    var id = req.params.id;
    var new_msg = req.body;
    console.log(new_msg);
    bd[id] = new_msg;
});

app.delete('/todo/update:id', function(req, res) {
    var id = req.params.id;
    delete bd[id];
});

var server = app.listen(8081, function() {
    console.log('Running on http://localhost:8081');
});