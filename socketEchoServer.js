var server = require('net').createServer(function (socket) {
  console.log('new connection');
  var timeout = 10000; // 10 seconds
  socket.setTimeout(timeout);
  socket.setEncoding('utf8');
  socket.write("Hello! You can start typing. Type 'quit' to exit.\n");
  socket.on('data', function (data) {
    console.log('got:', data.toString())
    if (data.trim().toLowerCase() === 'quit') {
      socket.write('Bye bye!');
      return socket.end();
    }
    socket.write(data);
  });
  
  socket.on('timeout', function () {
    socket.write('idle timeout, disconnecting, bye!');
    socket.end();
  });  
  socket.on('end', function () {
    console.log('Client connection ended');
  });
}).listen(4001);