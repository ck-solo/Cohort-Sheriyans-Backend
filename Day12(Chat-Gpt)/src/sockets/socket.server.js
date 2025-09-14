const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");
const aiService = require("../services/api.service");
const messageModel = require("../models/message.model");
const { createMemory } = require("../services/vector.service");
const { chat } = require("@pinecone-database/pinecone/dist/assistant/data/chat");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if (!cookies.token) {
      next(new Error("Authentication Error : No token provided"));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_TOKEN);

      const user = await userModel.findById(decoded.id);
      socket.user = user;

      next();
    } catch (err) {
      next(new Error("Authentication error : Invalid token "));
    }
    console.log("Socket connection cookies:", cookies);
  });

  io.on("connection", (socket) => {
    /*
        messagePayload = {
        chat: chatID,
        content : message text content
        }
        */
    socket.on("ai-message", async (messagePayload) => {
      console.log(messagePayload);

    //   await messageModel.create({
    //     chat: messagePayload.chat,
    //     user: socket.user._id,
    //     content: messagePayload.content,
    //     role: "user",
    //   });

    const vectors = await aiService.generateVector(messagePayload.content)
 
    await createMemory({
        vectors,
        messageId: "732839442",
        metadata: {
            chat: messagePayload.chat,
            user: socket.user._id
        }
    })


      const chatHistory = (
        await messageModel
          .find({
            chat: messagePayload.chat,
          })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
      ).reverse();
      /* 
        .sort({ createdAt: -1}) = descending order -1 stand for newest first
        .limit(4). = limit only 4 
        lean()). = Converts the Mongoose documents into plain JavaScript objects.
        reverse()  = sorted newest first, this reverses the array so that the result is oldest-to-newest order
         */

      const response = await aiService.generateResponse(
        chatHistory.map((item) => {
          return {
            role: item.role,
            parts: [{ text: item.content }],
          };
        })
      );

    //   await messageModel.create({
    //     chat: messagePayload.chat,
    //     user: socket.user._id,
    //     content: response,
    //     role: "model",
    //   });

      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat,
      });
    });
  });
  return io;
}

module.exports = initSocketServer;
