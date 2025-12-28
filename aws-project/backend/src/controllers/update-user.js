import { dynamoDB } from "../config/aws.js";
import { uploadToS3 } from "../services/s3.service.js";

export const updateUser = async (req, res) => {
  try {
    //  Step 1 — Get user_id from route params, aur name/email from request body
    const { user_id } = req.params;
    console.log("================update func====================");
    console.log(req.body,req.file);
    console.log("================update func====================");
    const { name, email } = req.body;

    //  Step 2 — Check agar koi file upload hui ho
    const file = req.file;
    let profileImage;

    if (file) {
      // Agar file hai to S3 pe upload karo aur profileImage variable mein uska URL store karo
      profileImage = await uploadToS3(file);
      // Example: profileImage = "https://users-profile-bucket-demo.s3.ap-south-1.amazonaws.com/profiles/abc123.webp"
    }

    //  Step 3 — Prepare update expression for DynamoDB
    const params = {
      TableName: "users",
      Key: { user_id }, // Ye specify karta hai kaunsa user update hoga

      // UpdateExpression specify karta hai ke kaunse fields update karne hain
      // Agar profileImage exist karti hai to usko bhi update karenge
      UpdateExpression:
        "set #n = :name, email = :email" +
        (profileImage ? ", profileImage = :profileImage" : ""),

      // ExpressionAttributeNames use hota hai reserved keywords avoid karne ke liye
      ExpressionAttributeNames: { "#n": "name" },

      // ExpressionAttributeValues mein actual values dalte hain jo update hongi
      ExpressionAttributeValues: {
        ":name": name, // DynamoDB ke name field ko yeh value milegi
        ":email": email, // email field update ho jayegi
        ...(profileImage && { ":profileImage": profileImage }),
        // Agar profileImage exist karti hai, toh ":profileImage" key create ho jayegi aur usme S3 ka URL store hoga
      },

      ReturnValues: "ALL_NEW", // Ye ensure karta hai ke updated user ka full object response mein mile
    };

    console.log("================params====================");
    console.log(params);
    console.log("================params====================");

    //  Step 4 — Execute update in DynamoDB
    const result = await dynamoDB.update(params).promise();

    console.log("================result====================");
    console.log(result);
    console.log("================result====================");

    //  Step 5 — Send response
    res.status(200).json({
      message: "User updated successfully",
      user: result.Attributes,
      // result.Attributes = updated object
      // Example:
      // {
      //   user_id: "uuid-123",
      //   name: "New Name",
      //   email: "newemail@example.com",
      //   profileImage: "https://s3-bucket-url/profiles/abc123.webp",
      //   createdAt: "2025-12-28T12:00:00.000Z"
      // }
    });
  } catch (error) {
    //  Error handling
    res.status(500).json({ error: error.message });
  }
};
