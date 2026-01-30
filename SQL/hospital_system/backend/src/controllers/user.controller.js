import * as userService from "../services/users.service.js";
import { sendResponse } from "../utils/ApiResponse.js";

// create user function
export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    sendResponse(res, 201, `${req.body.role} created successfully`, user);
  } catch (error) {
    next(error);
  }
};

// get all users function
export const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit, search, role } = req.query;

    const result = await userService.getAllUsers({
      page,
      limit,
      search,
      role,
    });

    sendResponse(res, 200, `${role}s fetched successfully`, result);
  } catch (error) {
    next(error);
  }
};

// get user by id function
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    sendResponse(res, 200, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

// update user function
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedData = await userService.updateUser(id, req.body);

    sendResponse(res, 200, "User updated successfully", updatedData);
  } catch (error) {
    next(error);
  }
};

// delete user function
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);

    sendResponse(res, 200, "User deleted successfully");
  } catch (error) {
    next(error);
  }
};
