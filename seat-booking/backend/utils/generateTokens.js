const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  try {
    if (!user) {
      throw new Error("User data is required to generate access token");
    }

    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        gender: user.gender,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.ACCESS_SECRET,
      { expiresIn: "7h" }
    );
  } catch (error) {
    throw new Error("Failed to generate access token");
  }
};

const generateRefreshToken = (user) => {
  try {
    if (!user) {
      throw new Error("User data is required to generate refresh token");
    }
    return jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });
  } catch (error) {
    throw new Error("Failed to generate refresh token");
  }
};

module.exports = { generateAccessToken, generateRefreshToken };
