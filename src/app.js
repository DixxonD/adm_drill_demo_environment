const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
const Student = require("./models/students");
const {customQuery} = require("./service");
const {createStudents, getUserByStudyProgram} = require("./service");

const dbUri = "mongodb://mongo:27017/testDB"

console.log("backend started", dbUri)

mongoose.connect(dbUri)
    .then(() => {
        console.log("connection established!")
        app.listen(3000)
    })
    .catch(err => console.log(err))

/**
 * Get Students By Study Programme
 * Example: http://localhost:3000/student?studyProgramme=Physics
 */
app.get("/query/student", (req, res) => {
    getUserByStudyProgram(req.query.studyProgramme)
        .then(data => res.send(data.rows))
        .catch(err => res.send(err))
})

/**
 * Access via Drill. Execute a custom Query via Rest API
 * Expected: { "query": <ANSI-SQL>}
 * Returns result of specified SQL Statement.
 */
app.post("/query", (req, res) => {
    const query = req.body.query
    customQuery(query).then(data => res.send(data.rows)).catch(err => res.send(err))
})

//------------------------------

/**
 * Initialize Mongo DB. Writes some students into MongoDB.
 * Direct access to Mongo (without Drill)
 */
app.get("/initialize", (req, res) => {
    createStudents().then(() => res.send("success")).then(err => res.send(err))
})

/**
 * Creates a Student.
 * Direct access to Mongo (without Drill)
 */
app.post("/student", (req, res) => {
    const student = new Student(req.body);
    student.save()
        .then(r => res.send(r))
        .catch(err => console.log(err));
});

/**
 * Returns all students
 * Direct access to Mongo (without Drill)
 */
app.get("/student", (req, res) => {
    Student.find((err, result) => {
        res.send(result)
    });
})

/**
 * Deletes a Student by ID
 * Direct access to Mongo (without Drill)
 */
app.delete("/student", (req, res) => {
    const studentId = req.body.id
    Student.deleteOne({id: studentId }, (err, response) => {
        if(err) return res.send(err)
        res.send(response)
    })
})



