const express = require("express")
const mongoose = require("mongoose")
const Todo = require("./Model/Task")
const cors = require("cors")
require("dotenv").config()
const app = express();
app.use(express.json())

const port = process.env.PORT || 4000;
const url = process.env.MONGODB_URL;
const corsOptions = {
    origin:"https://todolist-frontend-gkdl.onrender.com"
}

app.use(cors(corsOptions))

app.post("/add",(req,res)=>{
    try{
        const createtask = new Todo(req.body);
        createtask.save().then(()=>{
            res.status(200).json({message:"Task Created Successfully"})
        })
        .catch(()=>{
            res.status(500).json({message:"Unable to Create Task"})
        })
    } catch(err){
        res.status(500).json({message:"Unable to Create Task"})
    }
})

app.get("/get",(req,res)=>{
    try{
        Todo.find().then((task)=>{
            res.status(200).json({task})
        })
        .catch(()=>{
            res.status(500).json({message:"Unable to Find"})
        })
    }
    catch(err){
        res.status(500).json({message:"Unable to Find"})
    }
})

app.delete("/delete/:id",(req,res)=>{
    try{
        const id = req.params.id;
        Todo.findByIdAndDelete(id)
        .then(()=>res.status(200).json({message:"Task deleted Successfully"}))
        .catch(()=>res.status(500).json({message:"Unable to delete Task"}))
    } catch(err){
        res.status(500).json({message:"Unable to delete Task"})
    }
})

app.put("/update/:id",(req,res)=>{
    try{
        const id = req.params.id;
        Todo.findByIdAndUpdate({_id:id},{done:true})
        .then(()=>res.status(200).json({message:"Task has been Updated"}))
        .catch(()=>res.status(500).json({message:"Unable to Update Task"}))
    } catch(err){
        res.status(500).json({message:"Unable to Update Task"})
    }
})

const connectDB = async () =>{
    try{
        await mongoose.connect(url,{

        })
    console.log("Database is connected")
    } catch(err){
        console.error("Database connection failed:",err);
        process.exit(1);
    }
}
connectDB();

app.listen(port,()=>{
    console.log(`Server is Running on Port ${port}`);
})