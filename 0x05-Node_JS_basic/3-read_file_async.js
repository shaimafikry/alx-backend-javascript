const fs = require('fs').promises;

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8')
      .then((data) => {
        const dataArray = data.split('\n').filter((line) => line.trim() !== '');
        const numSt = dataArray.length - 1;
        console.log(`Number of students: ${numSt}`);
        const csList = [];
        const swList = [];
        for (const line of dataArray) {
          const studentData = line.split(',');
          if (studentData.includes('CS')) {
            csList.push(studentData[0]);
          }
          if (studentData.includes('SWE')) {
            swList.push(studentData[0]);
          }
          // console.log(student_data);
        }
        console.log(`Number of students in CS: 6. List: ${csList.join(', ')}`);
        console.log(`Number of students in SWE: 4. List: ${swList.join(', ')}`);
        resolve();
      })
      .catch(() => {
        reject(new Error('Cannot load the database'));
      });
  });
}

// const fs = require('node:fs');

// function countStudents(fileName) {
//   try {
//     const data = fs.readFileSync(fileName, 'utf8');
//     // console.log(data);
//     // the output is a whole string
//     // split on the \n and filter the empyt lines, empty lines on trim would equal ''
//     const dataArray = data.split('\n').filter((line) => line.trim() !== '');
//     // console.log(dataArray);
//     const numSt = dataArray.length - 1;
//     console.log(`Number of students: ${numSt}`);
//     const csList = [];
//     const swList = [];
//     for (const line of dataArray) {
//       const studentData = line.split(',');
//       if (studentData.includes('CS')) {
//         csList.push(studentData[0]);
//       }
//       if (studentData.includes('SWE')) {
//         swList.push(studentData[0]);
//       }
//       // console.log(student_data);
//     }
//     console.log(`Number of students in CS: 6. List: ${csList.join(', ')}`);
//     console.log(`Number of students in SWE: 4. List: ${swList.join(', ')}`);
//   } catch (error) {
//     throw new Error('Cannot load the database');
//   }
// }
module.exports = countStudents;
