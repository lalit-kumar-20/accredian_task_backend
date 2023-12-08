import express from 'express';
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
const salt=10;

const app=express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"signup"
})

app.post('/signUp',(req,res)=>{
    const sql="INSERT INTO login (`name`,`email`,`password`,`confirmpassword`) VALUES (?)"
    bcrypt.hash(req.body.password.toString(),salt, (err,hash)=>{
        if(err) return res.json({Error: "Error for hashing password"})
    const values=[
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.confirmpassword,
    ]
    db.query(sql, [values], (err,result)=>{
        if(err) return res.json({Error: "Inserting data Error in Server"})
        return res.json({Status: "Success"});
    })

    })


})

const port=5001;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})


