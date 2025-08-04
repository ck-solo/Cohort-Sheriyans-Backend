const express = require('express')
const app = express() //server created


app.use(express.json()) // middleware


let notes = []

// notes => title & description
app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.json({
        message:"Notes added successfully",
        notes: notes
    })
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})



