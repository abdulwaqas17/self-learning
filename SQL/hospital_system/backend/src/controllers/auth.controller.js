import { loginUserService } from "../services/auth.service";
import { ApiError } from "../utils/ApiError";
import { generateToken } from "../utils/jwt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUserService(email, password);

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};
