const express = require('express')

const connectToDB = require("./src/db/db")


const noteModel = require('./src/models/note.model') 
const app = express()

app.use(express.json())

app.get('/notes',async (req,res)=>{ 
    const notes = await noteModel.find()

    res.json({
        message:"Notes fetch successfully",
        notes
    })
})


app.delete('/notes/:index',async (req,res)=>{
    const noteId = req.params.id

    await noteModel.findOneAndDelete({
        _id : noteId
    })

    res.json({
        message:"Notes deleted"
    })
})


app.post('/notes',async (req,res)=>{
    const{title,content} = req.body
    console.log(title,content)

   await noteModel.create({
        title,content
    })
    res.json({
        message:"Note create Successfully"
    })
})

connectToDB()

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
