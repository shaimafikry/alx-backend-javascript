process.stdout.write('Welcome to Holberton School, what is your name?\n');
// taking input
process.stdin.on('readable', () => {
  const inp = process.stdin.read();
  if (inp) {
    console.log(`Your name is: ${inp}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
