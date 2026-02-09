import { generatePresignedUrl } from "../services/UploadService.js";


export const uploadImage = async (req, res, next) => {
  try {
    // CASE 1: Image file ayi → local upload
    if (process.env.USE_CDN !== "true") {
      const fileUrl = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;

      return res.json({
        success: true,
        uploadType: "local",
        key: req.file.filename,
        fileUrl,
      });
    }

    // CASE 2: Image file nahi ayi → generate presigned URL
    const { fileType, fileName, uploadFor } = req.body;

    if (!fileType || !fileName || !uploadFor) {
      return res.status(400).json({
        message: "fileType, fileName, uploadFor are required",
      });
    }

    const data = await generatePresignedUrl({
      fileType,
      fileName,
      uploadFor,
    });

    res.json({
      success: true,
      uploadType: "cdn",
      ...data,
    });
  } catch (err) {
    next(err);
  }
};




// import { generatePresignedUrl } from "../services/UploadService.js";

// export const getPresignedUploadUrl = async (req, res, next) => {
//   try {
//     const { fileType, fileName, uploadFor } = req.body;

//     console.log('==================filetype==================');
//     console.log(fileType);
//     console.log('==================filetype==================');

//     const data = await generatePresignedUrl({
//       fileType,
//       fileName,
//       uploadFor,
//     });

//     res.status(200).json({
//       success: true,
//       data,
//     });
//   } catch (error) {

//     console.log('=============pre sign service error=============');
//     console.log(error);
//     console.log('=============pre sign service error=========');
//     next(error);
//   }
// };
