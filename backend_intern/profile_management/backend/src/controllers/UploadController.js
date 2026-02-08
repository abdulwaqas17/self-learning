import { generatePresignedUrl } from "../services/upload.service.js";

export const getPresignedUploadUrl = async (req, res, next) => {
  try {
    const { fileType, uploadFor } = req.body;
    const userId = req.user.id; // JWT se aa raha

    const data = await generatePresignedUrl({
      userId,
      fileType,
      uploadFor
    });

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};
