var api = {};
global.api = api;
api.net = require('net');

var workersCount = 4;
var megaresult=[];
var task = [1,2,3,4,5,6,7,8,9,10,11,12];
var result = [];
var h = task.length / workersCount;
var sockets = [];
var counter=0;

var server = api.net.createServer(function(socket) {
  sockets.push(socket);

  if (sockets.length == workersCount) {
    sendTasks();
  }

  socket.on('data', function(data) {
    counter++;
    var clientResult = JSON.parse(data);
    console.log("Received task from client [" + clientResult.id + "]: " + clientResult.task);
    clientResult.task.forEach(function(item, index) {
      result[index + clientResult.id * h] = item;
      //megaresult.push(item);
    })
    console.log(counter+" "+workersCount);
    if (counter==workersCount) {
      console.log("Task complete. result: " + result/*megaresult*/);
    }
  });

}).listen(2000);

var sendTasks = function() {
    sockets.forEach(function (socket, index) {
      var clientTask = task.slice(h * index, h * (index + 1));
      socket.write(JSON.stringify({id: index, task: clientTask}));
      console.log("Sent task to client [" + index + "]: " + clientTask);
    })
}