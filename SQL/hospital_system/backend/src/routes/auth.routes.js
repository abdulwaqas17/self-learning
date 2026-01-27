import express from "express";
import { login } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authLoginSchema } from "../validators/auth.validator.js";


const router = express.Router();

router.post("/login", validate(authLoginSchema), login);

export default router;
