let mongoose=require('mongoose')
let mongoDBurl = 'mongodb://127.0.0.1:27017/todo'

mongoose.connect(mongoDBurl,
//     {
//     useNewUrlParser:true,useUnifiedTopology:true
// }
)
let db=mongoose.connection
db.on('connected',()=>{
   console.log('Mongo db is connected')
})
db.on('erroe',()=>{
    console.log('Failed to connect with mongo db')
})
db.on('disconnect',()=>{
    console.log("mongo db is disconnected")
})
module.exports=db