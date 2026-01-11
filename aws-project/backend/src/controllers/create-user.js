import { dynamoDB } from "../config/aws.js";
import { uploadToS3 } from "../services/s3.service.js";
import { v4 as uuid } from "uuid";

export const createUser = async (req, res) => {
  try {
    const {
      userName,
      email,
      phone,
      role,
      gender,
      dateOfBirth,
      address,
      isActive,
    } = req.body;

    const file = req.file;

    // Basic validations
    if (!userName || !email) {
      return res.status(400).json({ message: "userName and email are required" });
    }

    if (!file) {
      return res.status(400).json({ message: "Profile image is required" });
    }

    // 1 Upload image to S3
    const profileImage = await uploadToS3(file);

    // 2 Create user object
    const user = {
      user_id: uuid(),                 
      userName,                          
      email,                          
      phone: phone || null,            
      role: role || "user",           
      gender: gender || null,         
      dateOfBirth: dateOfBirth || null,
      address: address || null,     
      profileImage,                    
      isActive: isActive ?? true,    
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 3 Save user to DynamoDB
    await dynamoDB
      .put({
        TableName: "users",
        Item: user,
        ConditionExpression: "attribute_not_exists(email)", // optional safety
      })
      .promise();

    // 4 Response
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User creation failed",
      error: error.message,
    });
  }
};
