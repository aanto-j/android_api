const mysql = require('mysql');
const express = require('express');
const HttpStatus = require('http-status-codes');
const app = express();

app.use(express.urlencoded());
app.use(express.json());

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'class'
}); 

conn.connect((err) => {
    if(err) throw err;
    console.log("Connected");
});

app.get('/', (req,res) => {
        conn.query("SELECT * FROM student",(err,result,fields)=>{
            if (err) throw err;
            rows = JSON.stringify(result);
            if(rows == null || Object.keys(rows).length == 0){
                res.status(404).json("Not Found!")
            }
        res.json(result)
        });
});

app.post("/select", (req,res) => {
    let id = req.body.id
    conn.query("SELECT * FROM student where id = ?",[id],(err,result,fields)=>{
        if (err) throw err;
            rows = JSON.stringify(result);
            if(rows == null || Object.keys(rows).length == 0){
                res.status(404).json("Not Found!")
            }
            console.log(rows);
        res.json(result)
    });
})

app.post("/update", (req,res) => {
    let rollno = req.body.rollno
    let name = req.body.name
    let age = req.body.age
    let dept = req.body.dept
    conn.query( "UPDATE `student` SET `rollno` = ?, `name` = ?, `age` = ?, `dept` = ? WHERE `student`.`rollno` = ? ",[rollno,name,age,dept,rollno],
    (err,result,fields)=>{
        try{
            if (err) throw err;
            rows = JSON.stringify(result);
            if(rows == null || Object.keys(rows).length == 0){
                res.status(404).json("Not Found!")
            }
        res.json(result)
        }
        catch (err){
            res.status(HttpStatus.StatusCodes.NOT_FOUND).send("Error!");
        }
        // res.render("index",{rollno:rows[0].rollno,name:rows[0].name,dept:rows[0].dept,age:rows[0].age});
    });
})

app.post("/insert", (req,res) => {
    let rollno = req.body.rollno
    let name = req.body.name
    let age = req.body.age
    let dept = req.body.dept
    conn.query("INSERT INTO student values(NULL,?,?,?,?);",[rollno,name,age,dept],(err,result,fields)=>{
        try{
            if (err) throw err;
            rows = JSON.stringify(result);
            if(rows == null || Object.keys(rows).length == 0){
                res.status(404).json("Not Found!")
            }
        res.json(result)
        }
        catch (err){
            res.status(HttpStatus.StatusCodes.NOT_FOUND).send("Error!");
        }
        // res.render("index",{rollno:rows[0].rollno,name:rows[0].name,dept:rows[0].dept,age:rows[0].age});
    });
})

const server = app.listen(5000,() => {
    console.log("Listening on 5000.....");
});
