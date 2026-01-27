import { loginUserService } from "../services/auth.service.js";
import { ApiError } from "../utils/ApiError.js";
import { sendResponse } from "../utils/ApiResponse.js";
import { generateToken } from "../utils/jwt.js";
 
export const login = async (req, res,next) => { 
  try {
    const { email, password } = req.body;

    const user = await loginUserService(email, password);

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user);

    sendResponse(res, 200, "Login successful", { token });
  } catch (error) {
    console.log('===============login error=====================');
    console.log(error);
    console.log('===============login error=====================');
    next(error);
  }
};