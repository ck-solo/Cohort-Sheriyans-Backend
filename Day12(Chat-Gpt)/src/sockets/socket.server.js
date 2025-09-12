const { Server } = require('socket.io')
const cookie = require('cookie')
const userModel = require("../models/user.models") 

function initSocketServer(httpServer) {
    const io = new Server(httpServer, {})

    io.use(async ( socket, next) =>{
        const cookies = cookie.parse(socket.handshake.headers.cookie);

        if(!cookies.token){
            next(new Error ("Authentication Error : No token provided"))
        }

        try{
            const decoded = jwt.verify(cookies.token, process.env.JWT_TOKEN)
            
            const user = await userModel.findById(decoded.id)
            socket.user = user

            next()
        }
        catch (err){
            next(new Error("Authentication error : Invalid token "))

        }
        console.log("Socket connection cookies:", cookies)
 
    })

    io.on("connection",(socket)=>{
        console.log("New Socket connection", socket.user);
        console.log("New Socket connection", socket.id);
    })
    return io

}

module.exports = initSocketServer;