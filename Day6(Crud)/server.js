require('dotenv').config()
const express = require('express')
const connectToDB = require('./src/db/db') 
const noteModel = require('./src/models/note.model')
const app = express()
app.use(express.json())



 

app.post('/notes', async(req,res)=>{
    const{title, content} = req.body
    console.log(title, content)

    await noteModel.create({
        title,content
    })

    res.json({
        message:"Notes created successfully"
    })
  
})


app.get('/notes', async (req,res)=>{
    const notes = await noteModel.find()

    res.json({
        message:"notes fetch successfully",
        notes
    })    

})

app.delete('/notes/:id', async(req,res)=>{ 
    
    const noteId = req.params.id
    
    await noteModel.findOneAndDelete({
        _id:noteId
    })

    res.json({
        message:"notes deleted successfully"
    })
})

app.patch('/notes/:id',async(req,res)=>{
    
    const noteId = req.params.id
    const{title} = req.body

    await noteModel.findOneAndUpdate({
        _id : noteId

    },{
        title:title
    })

    res.json({
        message:"update notes successfully"

    })
})



connectToDB()
app.listen(3000, (req,res)=>{
    console.log("Server is running on port 3000")
})