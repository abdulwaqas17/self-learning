import express from "express";
import { getPresignedUploadUrl } from "../controllers/upload.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/presigned-url", protect, getPresignedUploadUrl);

export default router;
