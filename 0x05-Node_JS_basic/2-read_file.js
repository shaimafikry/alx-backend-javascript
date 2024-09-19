const fs = require('node:fs');

function countStudents(fileName) {
  // try {
  //   const data = fs.readFileSync(fileName, 'utf8');
  //   // console.log(data);
  //   // the output is a whole string
  //   // split on the \n and filter the empyt lines, empty lines on trim would equal ''
  //   const dataArray = data.split('\n').filter((line) => line.trim() !== '');
  //   // console.log(dataArray);
  //   const numSt = dataArray.length - 1;
  //   console.log(`Number of students: ${numSt}`);
  //   const csList = [];
  //   const swList = [];
  //   for (const line of dataArray) {
  //     const studentData = line.split(',');
  //     if (studentData.includes('CS')) {
  //       csList.push(studentData[0]);
  //     }
  //     if (studentData.includes('SWE')) {
  //       swList.push(studentData[0]);
  //     }
  //     // console.log(student_data);
  //   }
  //   console.log(`Number of students in CS: 6. List: ${csList.join(', ')}`);
  //   console.log(`Number of students in SWE: 4. List: ${swList.join(', ')}`);
  // } catch (error) {
  //   throw new Error('Cannot load the database');
  // }
  fs.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
      throw new Error('Cannot load the database');
    }
    const dataArray = data.split('\n').filter((line) => line.trim() !== '');
    // console.log(dataArray);
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
  });
}
module.exports = countStudents;
