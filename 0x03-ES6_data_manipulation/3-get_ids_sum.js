export default function getStudentIdsSum(arr) {
  const res = arr.reduce((sum, student) => sum + student.id, 0);
  return res;
}
