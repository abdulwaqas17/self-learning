let mongoose = require("mongoose");
require('dotenv').config();

let mongoURI = process.env.MONGO_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("db connected successfully");
  } catch (err) {
    console.log("mongo db connecting error => ",err);
    process.exit(1);
  }
};

module.exports = dbConnect;