const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const mysql = require("mysql2");

const app=express();
const db=mysql.createPool({
    host: "localhost",
    user:"root",
    password:"mysql123",
    database:"cruddb"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get",(req,res)=>{
     const sqlSelect= "select * from contactdetails";
     db.query(sqlSelect,(error,result)=>{
        res.send(result);
     })
})

app.post("/api/post",(req,res)=>{
    const {name,email,contact}=req.body;
    const sqlInsert= "insert into contactdetails(name,email,contact) values(?,?,?)";
    db.query(sqlInsert,[name,email,contact],(error,result)=>{
        console.log("error",error);
        console.log("result",result);
    })
})

 app.get("/",(req,res)=>{
 const sqlInsert= "insert into contactdetails(name,email,contact) values('valli','vallijavvadi@gmail.com','6745668900')";
 db.query(sqlInsert,(error,result)=>{
     console.log("error",error);
     console.log("result",result);
 })
 })
 
    

app.delete("/api/remove/:id",(req,res)=>
{
    const {id}=req.params;
    const sqlRemove="delete from contactdetails where id=?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})
app.get("/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlSelect="select * from contactdetails where id=?";
    db.query(sqlSelect,id,(error,result)=>{
        res.send(result);
    })
})
app.put("/api/put/:id",(req,res)=>{
    const {id} = req.params;
    const {name,email,contact}=req.body;
    const sqlInsert= "update contactdetails set name=?,email=?,contact=? where id=?";
    db.query(sqlInsert,[name,email,contact,id],(error,result)=>
    {
        console.log("error",error);
        console.log("result",result);
        res.send(result);
    })
})

app.listen(5000,()=>{ 
    console.log("Server is running on port 5000");
})
