export default function updateStudentGradeByCity(arr, city, newGrades) {
  return arr
    // use filter to excute location
    .filter((student) => student.location === city)
    // to applay the function on every return from filter
    .map((student) => {
      const studentGrade = newGrades.find((grade) => grade.studentId === student.id);
      return {
        ...student,
        grade: studentGrade ? studentGrade.grade : 'N/A',
      };
    });
}
