const express = require("express");
const registerUser = require("../../controllers/auth/signup");
const loginUser = require("../../controllers/auth/login");


const router = express.Router();

// User Login Route
router.post("/register",registerUser);

// User Login Route
router.post("/login", loginUser)


module.exports = router;