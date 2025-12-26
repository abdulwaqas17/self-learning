const Seat = require("../../models/seats");
const User = require("../../models/users");

const seatBook = async (req, res) => {
  try {
    const { seatID } = req.body;
    const loggedUser = req.user; // middleware se aata hai

    const findUser = await User.findById(loggedUser.id);

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "You cannot book seat.",
      });
    }

    const findSeat = await Seat.findById(seatID);

    if (!findSeat) {
      return res.status(400).json({
        success: false,
        message: "Seat not found.",
      });
    }

    //  Already booked or locked
    if (["locked", "booked"].includes(findSeat.status)) {
      return res.status(400).json({
        success: false,
        message: "You cannot book this seat.",
      });
    }

    //  Gender mismatch
    if (findSeat.seatGender !== loggedUser.gender) {
      return res.status(400).json({
        success: false,
        message: `This seat is only for ${findSeat.seatGender}`,
      });
    }

    //  Lock seat for 2 minutes
    const lockExpiryTime = new Date(Date.now() + 2 * 60 * 1000);

    console.log("lockExpiryTime", lockExpiryTime);

    findSeat.status = "locked";
    findSeat.lockedTime = {
      lockBy: loggedUser.email,
      expiresAt: lockExpiryTime,
    };

    await findSeat.save();

    global.io.emit("seatUpdated");

    console.log("findSeat", findSeat);

    return res.status(201).json({
      success: true,
      message: `Seat locked successfully for ${loggedUser.email}`,
      lockExpiresAt: lockExpiryTime,
    });
  } catch (error) {
    console.error("Error in Seat booking:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = seatBook;
