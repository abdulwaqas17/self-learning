const User = require("../../models/users");
const { generateAccessToken } = require("../../utils/generateTokens");
const jwt = require("jsonwebtoken");

const refreashToken = async (req,res) => {

    console.log("refreashToken api");
    console.log("cookies:", req.cookies);


  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  const user = await User.findOne({ refreshToken: token });
  if (!user) return res.sendStatus(403);

  jwt.verify(token, process.env.REFRESH_SECRET, (err) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
}

module.exports = refreashToken;

