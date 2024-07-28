// In this file, import uploadPhoto and createUser from utils.js
// Knowing that the functions in utils.js
// return promises, use the prototype below to
// collectively resolve all promises and log body
// firstName lastName to the console.
// function handleProfileSignup()
// In the event of an error, log Signup system offline to
// the console
// bob@dylan:~$ npm run dev 3-main.js
// photo-profile-1 Guillaume Salva
import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  return Promise.all([uploadPhoto(), createUser()])
    .then(([value1, value2]) => {
      console.log(value1.body, value2.firstName, value2.lastName);
    })
    .catch(() => { console.log('Signup system offline to the console'); });
}
