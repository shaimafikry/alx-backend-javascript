const fs = require('fs');

function countStudents(filePath) {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(filePath, 'utf8');
    // Split the data by new lines and filter out empty lines
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    // Get the total number of students
    const numStudents = lines.length - 1; // Exclude header
    console.log(`Number of students: ${numStudents}`);

    // Create objects to hold student names by field
    const studentsByField = {};

    // Process each line
    lines.forEach((line) => {
      const [firstName, , , field] = line.split(',');
      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }
      studentsByField[field].push(firstName);
    });
    // eslint-disable-next-line guard-for-in
    for (const field in studentsByField) {
      const names = studentsByField[field];
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
// const fs = require('node:fs');

// function countStudents(fileName) {
//   try {
//     const data = fs.readFileSync(fileName, 'utf8').split('\n');;
//     // console.log(data);
//     // the output is a whole string
//     // split on the \n and filter the empyt lines, empty lines on trim would equal ''
//     const dataArray = data.filter((line) => line.trim() !== '');
//     // console.log(dataArray);
//     if (dataArray.length === 0) {
//       throw new Error('Cannot load the database');
//     }
//     const numSt = dataArray.length - 1;
//     console.log(`Number of students: ${numSt}`);
//     const csList = [];
//     const swList = [];
//     for (const line of dataArray) {
//       const studentData = line.split(',');
//       if (studentData[3] === 'CS') {
//         csList.push(studentData[0]);
//       }
//       if (studentData[3] === 'SWE') {
//         swList.push(studentData[0]);
//       }
//       // console.log(student_data);
//     }
//     console.log(`Number of students in CS: 6. List: ${csList.join(', ')}`);
//     console.log(`Number of students in SWE: 4. List: ${swList.join(', ')}`);
//   } catch (error) {
//     throw new Error('Cannot load the database');
//   }
//   // fs.readFile(fileName, 'utf8', (error, data) => {
//   //   if (error) {
//   //     throw new Error('Cannot load the database');
//   //   }
//   //   const dataArray = data.split('\n').filter((line) => line.trim() !== '');
//   //   // console.log(dataArray);
//   //   const numSt = dataArray.length - 1;
//   //   console.log(`Number of students: ${numSt}`);
//   //   const csList = [];
//   //   const swList = [];
//   //   for (const line of dataArray) {
//   //     const studentData = line.split(',');
//   //     if (studentData.includes('CS')) {
//   //       csList.push(studentData[0]);
//   //     }
//   //     if (studentData.includes('SWE')) {
//   //       swList.push(studentData[0]);
//   //     }
//   //     // console.log(student_data);
//   //   }
//   //   console.log(`Number of students in CS: ${csList.length}. List: ${csList.join(', ')}`);
//   //   console.log(`Number of students in SWE: ${swList.length}. List: ${swList.join(', ')}`);
//   // });
// }
// module.exports = countStudents;
