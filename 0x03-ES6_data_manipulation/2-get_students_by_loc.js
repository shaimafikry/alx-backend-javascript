export default function getStudentsByLocation(arr, city) {
  return arr.filter((i) => i.location === city);
}
