const fs = require("fs");

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

const initialize = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("../data/courses.json", "utf8", (err, dataFromStudentFile) => {
      if (err) {
        reject(err);
        return;
      }
      let studentDataFromFile = JSON.parse(dataFromStudentFile);
      fs.readFile("../data/courses.json", "utf8", (err, dataFromCourseFile) => {
        if (err) {
          reject(err);
          return;
        }
        let coursesDataFromFile = JSON.parse(dataFromCourseFile);
        dataCollection = new Data(studentDataFromFile, coursesDataFromFile);
        resolve();
      });
    });
  });
};

const getAllStudents = () => {
  return new Promise((resolve, reject) => {
    if (dataCollection === null) {
      reject(new Error("Data has not been initialized"));
    } else if (dataCollection.students.length === 0) {
      reject(new Error("No results returned"));
    } else {
      resolve(dataCollection.students);
    }
  });
};

const getTAs = () => {
  return new Promise((resolve, reject) => {
    if (dataCollection === null) {
      reject(new Error("Data has not been initialized"));
    } else {
      const TAs = dataCollection.students.filter(
        (student) => student.TA === true
      );
      if (TAs.length === 0) {
        reject(new Error("No results returned"));
      } else {
        resolve(TAs);
      }
    }
  });
};

const getCourses = () => {
  return new Promise((resolve, reject) => {
    if (dataCollection === null) {
      reject(new Error("Data has not been initialized"));
    } else if (dataCollection.courses.length === 0) {
      reject(new Error("No results returned"));
    } else {
      resolve(dataCollection.courses);
    }
  });
};

const getStudentsByCourse = function (course) {
  return new Promise(function (resolve, reject) {
    const varCourse = dataCollection.students.filter(function (CourseID) {
      return CourseID.course == course;
    });
    if (varCourse.length == 0) {
      reject("no results returned");
      return;
    } else {
      resolve(varCourse);
    }
  });
};

let getStudentByNum = function (num) {
  return new Promise(function (resolve, reject) {
    const studentsNum = [];
    for (let i = 0; i < dataCollection.students.length; i++) {
      if (dataCollection.students[i].studentNum == num) {
        studentsNum.push(dataCollection.students[i]);
      }
    }
    if (studentsNum.length == 0) {
      reject("no results returned");
      return;
    }
    resolve(studentsNum);
  });
};

app.post("/students/add", (req, res) => {
  const studentData = req.body;

  addStudent(studentData)
    .then(() => {
      res.redirect("/students");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error adding student");
    });
});


module.exports = {
  initialize,
  getAllStudents,
  getTAs,
  getCourses,
  getStudentsByCourse,
  getStudentByNum,
  addStudent,
};
