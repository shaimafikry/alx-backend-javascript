// // const arr = [1,2,3,4,5,6,7]

// // const noe = arr.reduce((accumulator, currentValue) => {
// //   return accumulator + currentValue;})
// // console.log(noe)


// // const arr = [
// //   { id: 1, firstName: 'Guillaume', location: 'San Francisco' },
// //   { id: 2, firstName: 'James', location: 'Columbia' },
// //   { id: 5, firstName: 'Serena', location: 'San Francisco' }
// // ]

// // const res = arr.filter((i) => i.location === 'Columbia');
// // const mapRes = arr.map((student))=> grd
// // console.log(res);

// import getListStudents from "./0-get_list_students.js";



// function updateStudentGradeByCity(arr, city, newGrades) {
//   const more = arr
//     // use filter to excute location
//     .filter((student) => student.location === city)
//     // to applay the function on every return from filter
//     .map((student) => {
//       const studentGrade = newGrades.find((grade) => grade.studentId === student.id);
// 			console.log(studentGrade)
//       return {
//         ...student,
//         grade: studentGrade ? studentGrade.grade : 'N/A',
//       };
//     });
//   console.log(more)
// }
// console.log(updateStudentGradeByCity(getListStudents(), "San Francisco", [{ studentId: 5, grade: 97 }, { studentId: 1, grade: 86 }]));

// console.log(updateStudentGradeByCity(getListStudents(), "San Francisco", [{ studentId: 5, grade: 97 }]));
