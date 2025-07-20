const express = require('express')

// express() // server created
const app = express()

app.get('/about',(req,res)=>{
    res.send("Welcome to the About Page");
})

app.get('/home',(req,res)=>{
    res.send("Welcome to the Home Page");
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000.")
})