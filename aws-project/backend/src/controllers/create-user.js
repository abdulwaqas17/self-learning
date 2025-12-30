import { dynamoDB } from "../config/aws.js";
import { uploadToS3 } from "../services/s3.service.js";
import { v4 as uuid } from "uuid";

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image required" });
    }

    // Upload image to S3
    const imageUrl = await uploadToS3(file);

    // Save user to DynamoDB
    const user = {
      user_id: uuid(),
      name,
      email,
      profileImage: imageUrl,
      createdAt: new Date().toISOString(),
    };

    const newUser = await dynamoDB
      .put({
        TableName: "users",
        Item: user,
      })
      .promise();

    console.log("newUser ===============>", newUser);

    res.status(201).json({
      message: "User created with image",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
