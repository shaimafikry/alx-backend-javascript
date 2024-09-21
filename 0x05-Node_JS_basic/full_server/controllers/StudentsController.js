/* eslint-disable consistent-return */
import readDatabase from '../utils';

export default class StudentsController {
  static async getAllStudents(req, res) {
    const filePath = process.argv[2];
    try {
      const students = await readDatabase(filePath);
      let response = 'This is the list of our students\n';
      for (const [field, studentsList] of Object.entries(students).sort()) {
        response += `Number of students in ${field}: ${studentsList.length}. List: ${studentsList.join(', ')}\n`;
      }
      res.status(200).send(response.trim());
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const filePath = process.argv[2];
    const { major } = req.params;
    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const students = await readDatabase(filePath);
      const studentsList = students[major] || [];
      res.status(200).send(`List: ${studentsList.join(', ')}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}
