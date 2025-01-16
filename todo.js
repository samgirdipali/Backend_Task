let mongoose = require('mongoose');

let todoSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    task: {
     type:String,
    required: true,
    }
    
})
let Todo = mongoose.model('todo', todoSchema) 
module.exports = Todo
