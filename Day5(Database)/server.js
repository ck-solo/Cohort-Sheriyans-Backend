const express = require('express')
const connectToDB = require('./src/db/db')
//server database se connect server.js file me

connectToDB()
const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello World!")

})  

let notes = []

app.post('/notes',(req,res)=>{

    const {title,content} = req.body
    console.log(title,content) 
    res.json({
        message:"Notes Created Successfully"
    })
})

app.delete('/notes/:index',(req,res)=>{
    console.log(req.body)
    notes.delete(req.body)

    res.json({
        message:"Notes Deleted Successfully"
    })
})

app.patch('/notes/:index',(req,res)=>{
    console.log(req.body)
    notes.patch(req.body)


    res.json({
        message:"Note Updated Successfully"
    })
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")

})
