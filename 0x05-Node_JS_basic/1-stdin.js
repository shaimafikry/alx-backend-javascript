process.stdout.write('Welcome to Holberton School, what is your name?\n');
// taking input
process.stdin.on('readable', () => {
  const inp = process.stdin.read();
  if (inp) {
    process.stdout.write(`Your name is: ${inp}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});

// process.stdout.write('Welcome to Holberton School, what is your name?\n');
// // taking input
// process.stdin.on('data', (data) => {
//   const inp = data.toString();
//   if (inp) {
//     process.stdout.write(`Your name is: ${inp}`);
//     process.stdout.write('This important software is now closing\n');
//     process.exit();
//   }
// });
