const http = require('http');

const app = http.createServer((req, res) => {
  const msg = 'Hello Holberton School!';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', msg.length);
  res.statusCode = 200;
  res.end(msg);
});
app.listen(1245);
module.exports = app;
