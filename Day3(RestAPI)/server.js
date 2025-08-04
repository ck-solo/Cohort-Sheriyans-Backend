const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    res.send("Welcome to the Website .")
})

app.get('/home',(req,res)=>{
    res.send("Welcome to the Homme page.")
})

app.get('/about',(req,res)=>{
    res.send("Welcome to the About page.")
})
app.get('/service',(req,res)=>{
    res.send("Welcome to the Service page.")
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})