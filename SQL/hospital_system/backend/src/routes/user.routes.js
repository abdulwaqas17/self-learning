import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js"; 
import { allowRoles } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/roles.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUsersSchema, getUserQuerySchema } from "../validators/user.validator.js";
import { createUser, getAllUsers } from "../controllers/user.controller.js";


const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  allowRoles(ROLES.ADMIN),
  validate(createUsersSchema),
  createUser,
);

router.get(
  "/get",
  authMiddleware,
  allowRoles(ROLES.ADMIN,ROLES.STAFF),
  validate(getUserQuerySchema),
  getAllUsers,
);



export default router;
