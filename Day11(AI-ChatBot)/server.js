require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const generateRespone = require("./src/services/ai.services");
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on('ai-message',async (data)=>{
    console.log("Message from client", data.prompt)
    const response = await generateRespone(data.prompt);
    console.log("Ai-response", response)
    socket.emit("ai-message-response", { response: response })
  })
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
