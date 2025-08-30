require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const generateRespone = require("./src/services/ai.services")
const { userInfo } = require("os");
const io = new Server(httpServer, {
  /* options */
});

const chatHistory = [];

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  
  socket.on('ai-message',async (data)=>{
      console.log("Message from client", data.prompt)
      
      chatHistory.push({
        role:"user",
        parts:[{text:data}]
      })

      const response = await generateRespone(chatHistory);
      
      chatHistory.push({
        role:"model",
        parts:[{text:response}]
      })
      
    socket.emit("ai-message-response", { response: response })
  })
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
