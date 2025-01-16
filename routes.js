const express = require('express')
let routes = express.Router()

let passport=require('passport')
let localstatergy = require('passport-local').Strategy;

let Todo = require('../modules/todo')

let auth = passport.authenticate('local',{session:false})

passport.use(new localstatergy(async(USERNAME, password, done)=>{
  try{
      console.log('received request', USERNAME, password);
    let user =  await Todo.findOne({username:USERNAME});
    if(!user){
      return done(null, false,{message: 'User not found'})
    }
    let match =  user.password === password? true: false;
    // let match = await user.comparePassword(password);
    if(match){
      return done(null, user)
    }else{
      return done(null, false, {message: 'Password is incorrect'})
    }
  }
  catch(err){
    console.log(err);
  }
}))

routes.post('/add',async(req,res) =>{
    try{
      let data=req.body
      let newTodo=new Todo(data)
  
      let response = await newTodo.save()
      console.log('Task added successfully')
      res.status(200).send(response)
    }catch(err){
        console.log(err);
        res.status(500).send(err)  
    }
  })
  routes.get('/',auth, async (req, res) => {
    let todo = req.params.todo; 
    try {
      let response = await Todo.find({ todo: todo });
      if (response === 0) {
        return res.status(404).send("Not task occured");
      }
      console.log(`Task fetched`);
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  routes.patch('/:id',auth, async (req, res) => {
    let id=req.params.id
    let data=req.body
    try{
      let response = await Todo.findByIdAndUpdate(id,data,{new:true})
      if(!response){
        return res.status(404).send('Task not found')
      }else{
        console.log('One task updated sucessfully !!!');
        res.status(200).send(response)
      }
      
    }catch(err){
      console.log(err);
      res.status(500).send(err)
    }
  }
  )
  
  routes.delete('/:id', auth,async (req, res) => {
    let id=req.params.id
    try{
      let response = await Todo.findByIdAndDelete(id)
      if(!response){
        return res.status(404).send('Not task found')
      }else{
        console.log('task deleted sucessfully !!');
        res.status(200).send(response)
      }
      
    }catch(err){
      console.log(err);
      res.status(500).send(err)
    }
  }
  )
module.exports = routes