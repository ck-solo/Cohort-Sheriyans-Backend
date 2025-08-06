const express = require('express')

const app = express()

app.use(express.json())

let notes = []
// Post

app.post('/notes',(req,res)=>{ 
    console.log(req.body)
    notes.push(req.body)
    res.json({
        message:"Notes added Successfully",
        notes:notes
    })
})

// Put

// app.put("/home",(req,res)=>{
//     res.send("Notes update successfully")
// })
// Delete

// app.delete("/home",(req,res)=>{
//     res.send("Notes Deleted successfully")
// })

app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000")
})