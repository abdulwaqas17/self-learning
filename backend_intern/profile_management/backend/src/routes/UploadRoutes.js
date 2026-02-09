import express from "express";
import { uploadImage } from "../controllers/UploadController.js";
import { upload } from "../middlewares/MulterMiddleware.js";


const router = express.Router(); 

router.post(
  "/image",
  upload.single("image"), // agar image ayi ho
  uploadImage
);

export default router;


// import express from "express";
// import { getPresignedUploadUrl } from "../controllers/UploadController.js";

// const router = express.Router();

// router.post("/presigned-url", getPresignedUploadUrl);

// export default router;
