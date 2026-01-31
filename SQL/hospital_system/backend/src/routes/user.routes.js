import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js"; 
import { allowRoles } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/roles.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUsersSchema, getUserQuerySchema, updateUsersSchema } from "../validators/user.validator.js";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";
import { idParamSchema } from "../validators/global.validator.js";


const router = express.Router();

/**
 * @openapi
 * /users/create:
 *   post:
 *     summary: Create a new user (Admin only)
 *     description: |
 *       Only **ADMIN** users can create new users.
 *       If role is **DOCTOR**, doctor-specific fields are required.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/CreateAdminOrStaffUser'
 *               - $ref: '#/components/schemas/CreateDoctorUser'
 *
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/UserResponse'
 *                 - $ref: '#/components/schemas/DoctorUserResponse'
 *
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Only admin allowed)
 *       409:
 *         description: Email already exists or admin already exists
 */

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
  validate(getUserQuerySchema, "query"),
  getAllUsers,
);


router.get(
  "/get/:id",
  authMiddleware,
  allowRoles(ROLES.ADMIN,ROLES.STAFF,ROLES.DOCTOR),
  validate(idParamSchema, "params"),
  getUserById,
);

router.put(
  "/update/:id",
  authMiddleware,
  allowRoles(ROLES.ADMIN,ROLES.STAFF,ROLES.DOCTOR),
  validate(idParamSchema, "params"),
  validate(updateUsersSchema),
  updateUser,
);

router.delete(
  "/delete/:id",
  authMiddleware,
  allowRoles(ROLES.ADMIN),
  validate(idParamSchema, "params"),
  deleteUser,
);


export default router;