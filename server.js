/*********************************************************************************
 * WEB700 – Assignment 03
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
 * of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students.
 *
 * Name: Ayush Joshi Student ID: 154983217 Date: 2023-03-10
 *
 ********************************************************************************/


var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var app = express();
const collegeData = require("./modules/collegeData.js");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // Add this line

app.get("/students/add", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/addStudent.html"));
});

app.post("/students/add", (req, res) => {
  collegeData
    .addStudent(req.body)
    .then(() => {
      res.redirect("/students");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error adding student");
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/htmlDemo", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});

// ... the rest of your routes ...

app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

collegeData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("server listening at port: " + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

