import { generatePresignedUrl } from "../services/UploadService.js";

export const getPresignedUploadUrl = async (req, res, next) => {
  try {
    const { fileType, fileName, uploadFor } = req.body;

    console.log('==================filetype==================');
    console.log(fileType);
    console.log('==================filetype==================');

    const data = await generatePresignedUrl({
      fileType,
      fileName,
      uploadFor,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {

    console.log('=============pre sign service error=======================');
    console.log(error);
    console.log('=============pre sign service error=======================');
    next(error);
  }
};
