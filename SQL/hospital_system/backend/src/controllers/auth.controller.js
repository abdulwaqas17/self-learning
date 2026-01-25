import { loginUserService } from "../services/auth.service";
import { generateToken } from "../utils/jwt";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUserService(email, password);

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const token = generateToken(user);

  res.json({
    message: "Login successful",
    token
  });
};
