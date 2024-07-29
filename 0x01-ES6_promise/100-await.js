/*
Import uploadPhoto and createUser from utils.js
Write an async function named asyncUploadUser that will call these two
functions and return an object with the following format:
{
  photo: response_from_uploadPhoto_function,
  user: response_from_createUser_function,
}
If one of the async function fails, return an empty object. Example:
{
  photo: null,
  user: null,
}
*/
import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  const photo = uploadPhoto();
  const user = createUser();
  return Promise.all([photo, user])
    .then((values) => ({ photo: values[0], user: values[1] }))
    .catch(() => ({ photo: null, user: null }));
}
