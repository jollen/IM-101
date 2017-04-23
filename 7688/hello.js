var http = require('http');
var crypto = require('crypto');

var httpServer = http.createServer(function (req, res) {
  var obj = {
	name: 'jollen',
	email: 'jollen@jollen.org'
  };

  var hash = crypto.createHmac('sha1', 'myiot')
                   .update(JSON.stringify(obj))
                   .digest('hex');

  res.writeHead(200, {
	'Content-Type': 'application/json',
	'Etag': hash,
	'Cache-Control': 'public, max-age=31536000'
  });

  res.end(JSON.stringify(obj));
});

httpServer.listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
