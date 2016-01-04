var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
function get_date(){
	var currentTime = new Date();
	currentTime.setHours(currentTime.getHours() + 2);
	console.log(currentTime.toUTCString());
}


server.on("error", function (err) {
  console.log("server error:\n" + err.stack);
  server.close();
});

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on("message", function (msg, rinfo) {
	console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
	server.send(msg, 0, msg.length, rinfo.port, rinfo.address, function(err) {
	if (err) {
		console.error("Error sending OK buffer to client", err);
	} 
	else {
		//print out to the server's console that we've successfully sent the response to the client
		console.log("OK sent to client");
	}
	//server.close();
	
	get_date();
	console.log("UDP connection closed ");
	});	
});

server.bind(PORT, HOST);

