const Seat = require("../../models/seats");
const User = require("../../models/users");

const confirmSeat = async (req, res) => {
  try {
    const { seatID } = req.body;
    const loggedUser = req.user;

    const findUser = await User.findById(loggedUser.id);

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "User not authorized.",
      });
    }

    const findSeat = await Seat.findById(seatID);

    if (!findSeat) {
      return res.status(404).json({
        success: false,
        message: "Seat not found.",
      });
    }

    //  Seat must be locked
    if (findSeat.status !== "locked") {
      return res.status(400).json({
        success: false,
        message: "Seat is not locked.",
      });
    }

    //  Only locker can confirm
    if (findSeat.lockedTime?.lockBy !== loggedUser.email) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to confirm this seat.",
      });
    }

    const currentTime = new Date();
    console.log("currentTime",currentTime);
    console.log("findSeat.lockedTime.expiresAt",findSeat.lockedTime.expiresAt);
    

    //  Lock expired
    if (
      !findSeat.lockedTime?.expiresAt ||
      currentTime > findSeat.lockedTime.expiresAt
    ) {
      findSeat.status = "available";
      findSeat.lockedTime = undefined;
      await findSeat.save();

      return res.status(400).json({
        success: false,
        message: "Lock time expired. Seat is now available.",
      });
    }

    //  Confirm booking
    findSeat.status = "booked";
    findSeat.lockedTime = undefined;

    await findSeat.save();

    global.io.emit("seatUpdated");

    return res.status(200).json({
      success: true,
      message: "Seat confirmed successfully.",
    });
  } catch (error) {
    console.error("Error in confirm seat:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = confirmSeat;
