const User = require("../../models/users");
const { generateAccessToken } = require("../../utils/generateTokens");
const jwt = require("jsonwebtoken");

const refreashToken = async (req, res) => {
  try {
    console.log("refreashToken api");
    console.log("cookies:", req.cookies);

    const token = req.cookies.refreshToken;
    if (!token)
      return res.status(401).json({ message: "Refresh Token not found" });

    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.status(403).json({ message: "User not found" });

    // Verify token
    jwt.verify(token, process.env.REFRESH_SECRET);

    const newAccessToken = generateAccessToken(user);
    res.status(200).json({
      message: "New Access Token generated successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = refreashToken;
