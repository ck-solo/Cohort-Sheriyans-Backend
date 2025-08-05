const express = require('express')

const app = express()

app.use(express.json())

let notes = []

app.get('/',(req,res)=>{
    res.send("Hello, Cohort!")
})

app.post('/notes',(req,res)=>{
    console.log(req.body)
    notes.push(req.body)

    res.json(
        {
            message:"notes created successfully", 
        }
    )
})


/* Delete /notes/:index  */
app.delete('/notes/:index',(req,res)=>{
    const index = req.params.index
    delete notes[index]

    res.json({
        message:"Notes deleted successfully"
    })
})


/* Patch /notes/:index => {title}  */

app.patch("/notes/:index",(req,res)=>{
    const index = req.params.index
    const {title} = req.body

    if (!notes[index]) {
        return res.status(404).json({ message: "Notes not found" });
    }
    notes[index].title = title

    res.json({
        message:"Notes updated successfully"
    })
})




app.get('/notes',(req,res)=>{
    res.json(notes)
})

app.listen(3000,()=>{
    console.log("Server is running of port 3000")
})