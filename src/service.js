const axios = require("axios");
const Student = require("./models/students");
const DRILL_PATH = "http://drill:8047/query.json"
const DB = (schema) => `mongo.testdb.${schema}`

module.exports = {
    customQuery: async function(query){
        return await sendRequest(query);
    },

    getUserByStudyProgram: async function(studyProgramme){
        const query = `select * from ${DB("students")} where studyProgramme like '${studyProgramme}'`
        return await sendRequest(query)
    },

    createStudents: async function(){
        const s1 = new Student({
            id: 5502,
            firstname: "Peter",
            lastname: "Fisher",
            email: "peter.fisher@helloworld.com",
            studyProgramme: "Computer Science"
        });
        await s1.save()

        const s2 = new Student( {
            id: 4489,
            firstname: "Lea",
            lastname: "Heller",
            studyProgramme: "Computer Science"
        });
        await s2.save()

        const s3 = new Student({
            id: 1278,
            firstname: "John",
            lastname: "Smith",
            email: "john.smith@helloworld.com",
            studyProgramme: "Computer Science"
        });
        await s3.save()

        const s4 = new Student( {
            id: 1789,
            firstname: "Alex",
            lastname: "Seaman",
            studyProgramme: "Physics"
        });
        await s4.save()

    }

}

async function sendRequest(sqlQuery){
    const body = {
        queryType: "sql",
        query: sqlQuery,
        autoLimit: 1000
    }
    const data = await axios.post(DRILL_PATH, body)
    return data.data
}

