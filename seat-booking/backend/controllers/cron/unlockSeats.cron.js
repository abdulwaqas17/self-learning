const cron = require("node-cron");
const Seat = require("../../models/seats");

const unlockExpiredSeats = async () => {
  const now = new Date();

  await Seat.updateMany(
    {
      status: "locked",
      "lockedTime.expiresAt": { $lte: now },
    },
    {
      $set: {
        status: "available",
        lockedTime: null,
      },
    }
  );

  global.io.emit("seatUpdated");

  console.log("Expired locked seats unlocked");
};

// ⏱ Runs every 30 seconds
cron.schedule("*/60 * * * * *", unlockExpiredSeats);