const promise1 = Promise.resolve(3);
const promise2 = Promise.reject("hit");
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.allSettled([promise1, promise2, promise3]).then((values) => {
  console.log(values); // [3, 42, 'foo']
}).catch((error) => {
  console.log(error);
});
