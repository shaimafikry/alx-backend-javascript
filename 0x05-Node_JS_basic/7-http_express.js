const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

// app.get(route, arrow function, respone and request)
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const data = await countStudents('database.csv');
  res.send(`This is the list of our students\n${data}`);
});
app.listen(1245);
module.exports = app;
