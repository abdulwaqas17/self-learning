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

  console.log("Expired locked seats unlocked");
};

// ⏱ Runs every 30 seconds
cron.schedule("*/30 * * * * *", unlockExpiredSeats); 
