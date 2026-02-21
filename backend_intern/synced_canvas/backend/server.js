import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined ${roomId}`);
  });

  // Stroke Start
  socket.on("strokeStart", ({ roomId, x, y }) => {
    socket.to(roomId).emit("strokeStart", { x, y });
  });

  // Stroke Point (streaming)
  socket.on("strokePoint", ({ roomId, x, y, color, brushSize }) => {
    socket.to(roomId).emit("strokePoint", {
      x,
      y,
      color,
      brushSize,
    });
  });

  // Stroke End
  socket.on("strokeEnd", ({ roomId, color, brushSize }) => {
    socket.to(roomId).emit("strokeEnd", { color, brushSize });
  });

  socket.on("undo", ({ roomId }) => {
    socket.to(roomId).emit("undo");
  });

  socket.on("clear", ({ roomId }) => {
    socket.to(roomId).emit("clear");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});