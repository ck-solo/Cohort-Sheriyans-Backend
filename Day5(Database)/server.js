const express  = require('express')
const connnetTODB = require('./src/db/db')

connnetTODB()

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.post('/notes',(req,res) =>{
    const{title,content} = req.body

    console.log(title,content)
})


app.listen(3000,(req,res)=>
console.log("Server is running on port 3000!"))