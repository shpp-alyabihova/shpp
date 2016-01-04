var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8080;

function get_date(){
	var currentTime = new Date();
	console.log(currentTime.toUTCString());
}

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(socket) {
    var clientAdress = socket.remoteAddress;
	var clientPort = socket.remotePort;
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    socket.on('data', function(data) {
        
        console.log('DATA ' + socket.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        socket.write(data);
        
    });
    
    // Add a 'close' event handler to this instance of socket
    socket.on('close', function() {
		get_date();
        console.log('CLOSED: ' + clientAdress + ' '+ clientPort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);