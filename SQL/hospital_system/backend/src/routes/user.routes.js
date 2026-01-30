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
 * /create:
 *   post:
 *     summary: Create a new user
 *     tags: [Usersss]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, role]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, DOCTOR, STAFF]
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Email already exists
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