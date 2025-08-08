const express = require("express")

const app = express()

app.use(express.json())

let notes = []

app.get('/',(req,res)=>{
    res.send()

})

app.get('/notes',(req,res)=>{
    res.json(notes)

})

/* POST /notes  => {title , content} */

app.post('/notes',(req,res)=>{
    console.log(req.body)
    notes.push(req.body)

    res.json({
        message:"notes created successfully"
    })
})


/*DELETE /notes/:index  */

app.delete('/notes/:index', (req, res)=>{
    const index = req.params.index;
    delete notes[index];
    res.json({
        message:"notes deleted successfully",
    });

});

/*PATCH /notes/:index */

app.path('/notes/:index',(req ,res)=>{
     const index = req.params.index
     const {title} = req.title 

     notes[index].title = title     

     res.json({
        message: "message updtaed successfully"
     })

    })



app.listen('3000',()=>{
    console.log("Server is running of port 3000")
})