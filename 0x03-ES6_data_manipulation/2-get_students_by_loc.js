export default function getStudentsByLocation(arr) {
  if (!Array.isArray(arr, city)) {
    return [];
  }
  return arr.filter((i) => if i.location === city);
}
