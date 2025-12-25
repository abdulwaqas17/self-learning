const bcrypt = require("bcryptjs");
const Seat = require("../../models/seats");

//  User Signup Controller (for role: patient only)
const seatAdd = async (req, res) => {
  try {
    const { seatNum, seatName, seatGender, status } = req.body;

    //  Basic required fields check
    if (!seatNum || !seatName || !seatGender || !status) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    //  Create new user (only patient role)
    const newSeat = new Seat({
      seatNum,
      seatName,
      seatGender,
      status,
    });

    await newSeat.save();

    return res.status(201).json({
      success: true,
      message: "Seat added successfully.",
      data: newSeat,
    });
  } catch (error) {
    console.error("Error in Seat added:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = seatAdd;
