const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    const msg = 'Hello Holberton School!';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', msg.length);
    res.statusCode = 200;
    res.end(msg);
  } else if (req.url === '/students') {
    let msg = 'This is the list of our students\n';
    const studentInfo = await countStudents('database.csv'); // Handle the Promise result
    res.statusCode = 200;
    msg += studentInfo;
    // console.log(msg);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', Buffer.byteLength(msg)); // Use Buffer.byteLength for accurate length
    res.end(msg);
  }
});
app.listen(1245);
module.exports = app;
