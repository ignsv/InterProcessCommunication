var api = {};
global.api = api;
api.net = require('net');

var socket = new api.net.Socket();

socket.connect({
  port: 2000,
  host: '127.0.0.1',
}, function() {
  socket.on('data', function(data) {
    var response = JSON.parse(data);
    console.log('Recieved task: ' + response.task);
   	response.task = response.task.map(function(item) {
    	return item * 2;
    })
    socket.write(JSON.stringify(response));
    console.log('Returned task: ' + response.task);
  });
});
