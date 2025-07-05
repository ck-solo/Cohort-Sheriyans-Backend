// const catMe = require('cat-me')

// console.log(catMe())


// Creating server

const http = require('http')

const server = http.createServer((req,res)=>{
    res.end("Hello world from the server")
})

server.listen(3000,()=>{
    console.log("Server is running on port 3000")
})