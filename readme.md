# Backend for Drill Test Environment

## Getting Started
Docker and Docker-Compose have to be installed.  
Run the following command in the root directory.
```shell
$ docker-compose up
```
When MongoDB, Drill and this NodeJS backend are started, the frontend of Drill can be started: `localhost:8087`
Activate the MongoDB plugin (`http://localhost:8047/storage/mongo`) and set the following configuration:
```json
{
  "type": "mongo",
  "connection": "mongodb://mongo:27017/",
  "enabled": true
}
```

Add a workspace in the `dfs` plugin (`http://localhost:8047/storage/dfs`)
 ```json
     "storage": {
      "location": "/storage",
      "writable": true,
      "defaultInputFormat": null,
      "allowAccessOutsideWorkspace": false
    }
 ```

Fill the database with data using the requests described in the REST API section.
Drill queries can be executed directly in the drill frontend (`http://localhost:8047/query`) or via NodeJS backend..

## REST API

Base URL:
http://localhost:3000

### Initialize Database
Write students in the database. Existing data is not overwritten.
It is written directly into the database (without using Drill).

***URI:*** /initialize  
***Method:*** GET  

### Get all students of Study Programme
Sends an SQL query to Drill. Returns all students in a programme.

***URI:*** /query/student?studyProgramme=< studyProgramme >  
***Method:*** GET  

### Custom Drill Query
Executes a user-defined ANSI SQL query

***URI:*** /query  
***Method:*** POST  
***Body:*** 
```json
{"query": "ANSI-SQL"}
```


### Creates a Student
Create a new Student. It is written directly into the database (without using Drill). 

***URI:*** /student  
***Method:*** POST  
***Body:*** 
```json
{
  "id": "Number",
  "firstName": "String",
  "lastname": "String",
  "email": "String",
  "studyProgramme": "String"
}
```


### Get all Students
Returns all students in the database. Without using Drill, for debugging purposes.

***URI:*** /student  
***Method:*** GET  

### Delete a Student
Deletes a student.  Without using Drill, for debugging purposes.

***URI:*** /student  
***Method:*** DELETE  
***Body:***
```json
{"id": "number"}
```

## Example Queries
Returns all students
```sql
select * from mongo.testdb.students
``` 

Returns all student/project assignments
```sql
select student.firstname, student.lastname, project.title, project.descripton
from dfs.storage.`projects.csvh` as project
join dfs.storage.`enrollment.json` as enrollment
on project.id=enrollment.projectId
join mongo.testdb.students as student
on enrollment.studentId=student.id

```