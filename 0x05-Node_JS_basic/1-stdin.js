console.log('Welcome to Holberton School, what is your name?');
// taking input
process.stdin.on('readable', () => {
  const inp = process.stdin.read();
  if (inp) {
    console.log(`Your name is: ${inp}`);
  }
});

process.stdin.on('end', () => {
  console.log('This important software is now closing\n');
});
