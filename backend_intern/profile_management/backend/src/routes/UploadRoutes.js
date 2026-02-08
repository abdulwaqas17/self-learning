import express from "express";
import { getPresignedUploadUrl } from "../controllers/UploadController.js";

const router = express.Router();

router.post("/presigned-url", getPresignedUploadUrl);

export default router;
