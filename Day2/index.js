const http = require('http')

const server = http.createServer((req,res)=>{
    res.end("Hello world") // response send krte hai
}) //server create ho jata h

server.listen(3000,()=>{
    console.log("Server is running on port 3000")
})