export default function getStudentIdsSum(arr) {
  return arr.reduce((accum, cValue) => accum + cValue, 0);
}
