var PORT = 33334;
var serverPort = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');


var client = dgram.createSocket('udp4');

client.on("message", function (msg, rinfo) {
		console.log("Received from server ping back: " + msg);
		client.close();
	});

client.bind(PORT, HOST);

var message = new Buffer('Ping');

client.send(message, 0, message.length, serverPort, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ serverPort);
	
});

