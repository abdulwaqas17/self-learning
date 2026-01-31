import express from "express";
import { login } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authLoginSchema } from "../validators/auth.validator.js";


const router = express.Router();
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: |
 *       Authenticate user using **email & password**.
 *       On success, returns a **JWT access token**.
 *     tags: [Auth]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *
 *       401:
 *         description: Invalid email or password
 *
 *       422:
 *         description: Validation error
 */
router.post("/login", validate(authLoginSchema), login);

export default router;
