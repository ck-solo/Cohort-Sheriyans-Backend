const { Server } = require('socket.io')
const cookie = require('cookie')
function initSocketServer(httpServer) {
    const io = new Server(httpServer, {})

    io.use((socket, next) =>{
        const cookies = cookie.parse(socket.handshake.headers.cookie);

        if(!cookies.token){
            next(new Error ("Authentication Error : No token provided"))
        }
        console.log("Socket connection cookies:", cookies)
 
    })

    io.on("connection",(socket)=>{
        console.log("New Socket connection", socket.id);
    })
    return io

}

module.exports = initSocketServer;