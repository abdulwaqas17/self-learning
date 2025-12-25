const express = require("express");

const seatAdd = require("../../controllers/seats/add");
const seatBook = require("../../controllers/seats/bookedSeat");
const verifyToken = require("../../middlewares/verifyToken");
const seatGets = require("../../controllers/seats/getSeats");
const confirmSeat = require("../../controllers/seats/confirmSeat");

const router = express.Router();

// User Login Route
router.post("/add",seatAdd);
router.put("/book",verifyToken,seatBook);
router.put("/confirm",verifyToken,confirmSeat);
router.get("/get",seatGets);

module.exports = router;