const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    studyProgramme: {
        type: String,
        required: true
    }

}, {timestamps: true});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;