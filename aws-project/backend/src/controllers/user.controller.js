import { uploadToS3 } from "../services/s3.service.js";

export const createUser = async (req, res) => {
  try {
    console.log("======== createUser ============ ", res,req);
    
    const { name, email } = req.body;

    let imageUrl;
    if (req.file) {
       imageUrl = await uploadToS3(req.file);
    }

    res.status(201).json({
      message: "User created successfully",
      data: {
        name,
        email,
        profileImage: imageUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
