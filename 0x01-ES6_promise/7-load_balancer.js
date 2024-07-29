/* Write and export a function named loadBalancer.
 It should accept two arguments chinaDownload (Promise) and USDownload (Promise).
 The function should return the value returned by the promise that resolved the first.
 we use promise.race to et th first one
*/
export default function loadBalancer(chinaDownload, USDownload) {
  return Promise.race([chinaDownload, USDownload])
    .then((value) => value);
}
