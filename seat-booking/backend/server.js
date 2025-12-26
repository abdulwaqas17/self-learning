require("./controllers/cron/unlockSeats.cron");
require("dotenv").config();
let express = require("express");
let http = require("http");
let { Server } = require("socket.io");
let authRoutes = require("./routes/auth/auth.routes");
let seatRoutes = require("./routes/seats/seat.routes");
const cookieParser = require("cookie-parser")
let app = express();
let connectDB = require("./config/db");
let cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


// to connect mongo db
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  }
});

// socket instance global banado
global.io = io;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/seat", seatRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("server is running on port", PORT));
