// Import signUpUser from 4-user-promise.js and uploadPhoto from 5-photo-reject.js.
// Write and export a function named handleProfileSignup.
// It should accept three arguments firstName (string), lastName (string), and fileName (string).
// The function should call the two other functions.
//  When the promises are all settled it should return an array with the following structure:
// [
//     {
//       status: status_of_the_promise,
//       value: value or error returned by the Promise
//     },
//     ...
//   ]
import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  return Promise.allSettled([signUpUser(`${firstName}`, `${lastName}`), uploadPhoto(`${fileName}`)]);
}
