const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");
const {
  chat,
} = require("@pinecone-database/pinecone/dist/assistant/data/chat");

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
      /*
      const message = await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: messagePayload.content,
        role: "user",
      });
      
      const vector = await aiService.generateVector(messagePayload.content)
      */

      const [message, vectors] = await Promise.all([
        messageModel.create({
          chat: messagePayload.chat,
          user: socket.user._id,
          content: messagePayload.content,
          role: "user",
        }),
        aiService.generateVector(messagePayload.content),
        ]);

       await createMemory({
          vector: vectors,
          messageId: message._id,
          metadata: {
            chat: messagePayload.chat,
            user: socket.user._id,
            text: messagePayload.content,
          },
        })
      

      /* 
    const memory = await queryMemory({
        queryVector: vector,
        limit: 2,
        metadata: {
          user: socket.user._id,
        },
      });
      
      const chatHistory = (
        await messageModel
        .find({
            chat: messagePayload.chat,
          })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
          ).reverse();
        
          */

      /* 
          .sort({ createdAt: -1}) = descending order -1 stand for newest first
        .limit(4). = limit only 4 
        lean()). = Converts the Mongoose documents into plain JavaScript objects.
        reverse()  = sorted newest first, this reverses the array so that the result is oldest-to-newest order
         */

       const [memory, chatHistory] = await Promise.all([

        queryMemory({
          queryVector: vectors,
          limit: 2,
          metadata: {
            user: socket.user._id,
          }
        }),

        messageModel.find({
          chat:messagePayload.chat,
        }).sort({createdAt: -1}).limit(20).lean().then(messages => messages.reverse() )
      ]);

      const stm = chatHistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.content }],
        };
      });

      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `
              these are some previous messages from the chat , use them to generate a response

              ${memory.map((item) => item.metadata.text).join("/n")}
              `,
            },
          ],
        },
      ];

      const response = await aiService.generateResponse([...ltm, ...stm]);

      const responseMessage = await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: response,
        role: "model",
      });

      const responseVectors = await aiService.generateVector(response);

      await createMemory({
        vector: responseVectors,
        messageId: responseMessage._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text: response,
        },
      });

      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat,
      });
    });
  });
  return io;
}

module.exports = initSocketServer;
