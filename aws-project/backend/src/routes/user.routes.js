import express from "express";
import { createUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/add", upload.single("image"), createUser);

export default router;
