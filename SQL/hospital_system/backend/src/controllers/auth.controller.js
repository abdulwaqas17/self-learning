import { loginUserService } from "../services/auth.service";
import { ApiError } from "../utils/ApiError";
import { sendResponse } from "../utils/ApiResponse";
import { generateToken } from "../utils/jwt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUserService(email, password);

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user);

    sendResponse(res, 200, "Login successful", { token });
  } catch (error) {
    next(error);
  }
};
