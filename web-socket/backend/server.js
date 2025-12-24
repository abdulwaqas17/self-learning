// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const dbConnect = require("./config/db");
// const message = require("./models/message");
// require('dotenv').config();

// const app = express();
// app.use(cors());

// dbConnect();

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: { origin: "http://localhost:5173" },
// });

// // socket code
// io.on("connection", async (socket) => {
//   console.log("User connected");

//   try {
//     const messages = await message.find();
//     socket.emit("oldMessages", messages);
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//   }

//   socket.on("sendMessage", async (data) => {
//     try {
//       const newMsg = await message.create(data);
//       io.emit("receiveMessage", newMsg);
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   });
// });

// server.listen(5000, () => console.log("Server started"));

const express = require("express");
const http = require("http");
const dbConnect = require("./config/db");
const { Server } = require("socket.io");
const cors = require("cors");
const Message = require("./models/message");
const { log, timeStamp } = require("console");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
dbConnect();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
  pingTimeout: 60000, // for check online status, client socket will send a ping every 25 seconds automatically
});

// Store online users
const onlineUsers = new Map();

io.on("connection", async (socket) => {
  console.log("user connected", socket);

  // user register
  socket.on("register", (username) => {
    onlineUsers.set(socket.id, username);
  });

  //get old Messages
  socket.on("getOldMessages", async () => {
    try {
      const oldMessages = await Message.find()
        .sort({ timestamp: -1 })
        .limit(100);
      socket.emit("oldMessages", oldMessages.reverse());
    } catch (error) {
      console.log("error =>", error);
    }
  });

  // get online users
  socket.on("getOnlineUsers", () => {
    io.emit("onlineUsers", Array.from(onlineUsers.values()));
  });

  // send and receive message
  socket.on("sendMessage", async (data) => {
    try {
      const newMessage = await Message.create({
        ...data,
        timestamp: Date.now(),
      });

      io.emit("recieveMessage", newMessage);
    } catch (error) {
      console.log("error =>", error);
    }
  });

  // start tying and send typing user
  socket.on("typing", (userName) => {
    socket.broadcast.emit("userTyping", userName);
  });

  //stop typing
  socket.on("stopTyping", () => {
    socket.broadcast.emit("userStopTyping");
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.id);
    io.emit("onlineUsers", Array.from(onlineUsers.values()));
  });
});

// io.on("connection", async (socket) => {
//   console.log("User connected: socket ==>", socket, "socket id ==>", socket.id);

//   // Handle user registration
//   socket.on("register", async (username) => {
//     onlineUsers.set(socket.id, username);
//     io.emit("onlineUsers", Array.from(onlineUsers.values()));
//     console.log("=================emit users===================");
//   });

//   // Send old messages
//   socket.on("getOldMessages", async () => {
//     try {
//       const messages = await Message.find().sort({ timestamp: 1 }).limit(100);
//       socket.emit("oldMessages", messages);
//       console.log("================oldMessages get by on ====================");
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       console.log("================oldMessages error====================");
//     }
//   });

//   // Handle new messages
//   socket.on("sendMessage", async (data) => {
//     try {
//       const newMsg = await Message.create({
//         ...data,
//         timestamp: new Date(),
//       });
//       io.emit("receiveMessage", newMsg);
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   });

//   // Handle typing indicator
//   socket.on("typing", (data) => {
//     socket.broadcast.emit("userTyping", data);
//   });

//   socket.on("stopTyping", () => {
//     socket.broadcast.emit("userStopTyping");
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     onlineUsers.delete(socket.id);
//     io.emit("onlineUsers", Array.from(onlineUsers.values()));
//     console.log("User disconnected:", socket.id);
//   });
// });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
