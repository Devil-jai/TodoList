const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json()) 

mongoose.connect('mongodb://localhost:27017/todolist')

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err => console.log(err))
})

app.post('/add',(req,res)=>{
    const task = req.body.task
    TodoModel.create({
        task:task
    }).then(result => res.json(result))
    .catch(err => res.json(err))

})

app.put('/update/:id',(req,res)=>{
    const {id} = req.params;
    // console.log("sdklfj",id);
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.get("/",(req,res)=>{
    app.use(express.static(path.resolve(__dirname,"todolist","build")))
    res.sendFile(path.resolve(__dirname,"todolist","build","index.html"))
})

app.listen(1000,() =>{
    console.log("Server is Running");
})