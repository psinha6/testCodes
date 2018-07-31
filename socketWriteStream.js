var ws = require('fs').createWriteStream('./mySocetWriter.txt');

var server = require('net').createServer(function (socket) {
  socket.pipe(ws);
  
}).listen(4001);