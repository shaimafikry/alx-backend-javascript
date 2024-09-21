const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const database = process.argv[2];
// app.get(route, arrow function, respone and request)
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.setHeader('Content-Type', 'text/plain'); // Ensure plain text

  // if (!database) {
  //   res.send('This is the list of our students\nNo database provided');
  //   return;
  // }

  try {
    const data = await countStudents(database);
    res.send(`This is the list of our students\n${data}`);
  } catch (error) {
    res.send('This is the list of our students\nCannot load the database');
  }
});

// app.get('/students', async (req, res) => {
//   const data = await countStudents(process.argv[2]);
//   res.send(`This is the list of our students\n${data}`);
// });
app.listen(1245);
module.exports = app;
