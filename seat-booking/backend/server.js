let express = require('express');
let authRoutes = require("./routes/auth/auth.routes");
let seatRoutes = require("./routes/seats/seat.routes");
let app = express();
require('dotenv').config();
let connectDB = require('./config/db');


let cors = require('cors'); 

app.use(express.json()); 


app.use(cors());

// to connect mongo db
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/seat', seatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log('server is running on port',PORT));