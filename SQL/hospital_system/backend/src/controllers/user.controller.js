import * as userService from "../services/users.service.js"
import { sendResponse } from "../utils/ApiResponse.js";


// create user function
export const createUser = async (req, res, next) => {
  try {
    const userId = await userService.createUser(req.body);
    sendResponse(res, 201, `${req.body.role} created successfully`, { id: userId });
  } catch (error) {
    console.log('=================create user error===================');
    console.log(error);
    console.log('=================create user error===================');
    next(error);
  }
};

// get all users function
export const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit, search,role } = req.query;

    const result = await userService.getAllUsers({
      page,
      limit,
      search,
      role
    });

    sendResponse(res, 200, `${role}s fetched successfully`, result);
  } catch (error) {
    next(error);
  }
};
