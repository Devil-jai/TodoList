const mongoose = require("mongoose")

const TodoSchema  = new mongoose.Schema({
    
        task:String,
        done:{
            type:Boolean,
            default:false
        }
        
    
})

const User = mongoose.model("Task",TodoSchema)
module.exports = User;