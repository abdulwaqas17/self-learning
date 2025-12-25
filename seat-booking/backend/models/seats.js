const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    seatNum: {
      type: Number,
      required: true,
    },

    seatName: {
      type: String,
      trim: true,
      required: true,
    },

    seatGender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    status: {
      type: String,
      enum: ["booked", "available", "locked"],
      required: true,
      default: "available",
    },

    lockedTime: {
      lockBy: {
        type: String, // user email
      },
      lockTime: {
        type: Date, // expiry time
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seat", seatSchema);