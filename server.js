const express = require('express')
const app = express()
let db = require('./database')
let todo = require('./routes/routes')
let bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use('/task', todo)
app.listen(3000,()=>{
  console.log('listening on port 3000');
  
})