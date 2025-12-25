const bcrypt = require("bcryptjs");
const Seat = require("../../models/seats");

//  User Signup Controller (for role: patient only)
const seatGets = async (req, res) => {
  try {
    

    const findSeats = await Seat.find();
   

    return res.status(201).json({
      success: true,
      message: "Seat get successfully.",
      data: findSeats,
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

module.exports = seatGets;
