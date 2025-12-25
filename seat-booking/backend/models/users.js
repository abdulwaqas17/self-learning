const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    // Common fields for all users
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },

  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);

