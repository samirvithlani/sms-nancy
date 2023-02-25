const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
require('dotenv').config()
const PORT = process.env.PORT||3000;

const AdminRoutes = require("./routes/admin/AdminRoutes")
const StudentRoutes = require("./routes/student/StudentRoutes")

app.use("/admin",AdminRoutes)
app.use("/student",StudentRoutes)

//database
mongoose.connect('mongodb://127.0.0.1:27017/SMS-Nancy',(err)=>{
 if(err){
    console.log("Database not connected");
 }
 else{
    console.log("Database connected");
 }
})
//server
app.listen(3000,(err)=>{
    if(err){
        console.log("Server not started");
    }
    else{
        console.log("Server started..."+PORT);
    }
})