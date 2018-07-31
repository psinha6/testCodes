var util = require('util');
require('http').createServer(function (req, resp) {
  resp.writeHead(200, {'Content-Type' : 'text/plain'});
  resp.end(util.inspect(req.headers));
}).listen(9001);