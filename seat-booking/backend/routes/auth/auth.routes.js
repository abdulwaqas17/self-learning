const express = require("express");
const registerUser = require("../../controllers/auth/signup");
const loginUser = require("../../controllers/auth/login");
const refreashToken = require("../../controllers/auth/refreashToken");


const router = express.Router();

// User Login Route
router.post("/register",registerUser);

// User Login Route
router.post("/login", loginUser);

router.post("/refresh-token", refreashToken);


module.exports = router;