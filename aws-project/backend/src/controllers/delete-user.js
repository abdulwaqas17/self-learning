import { s3, dynamoDB } from "../config/aws.js";

export const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    //  Get user from DynamoDB to fetch S3 image key
    const getUser = await dynamoDB
      .get({
        TableName: "users",
        Key: { user_id },
      })
      .promise();

    console.log("getUsers =============>", getUser);

    if (!getUser.Item) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Delete image from S3
    const imageUrl = getUser.Item.profileImage;

    if (imageUrl) {
      // Remove bucket domain part
      const urlParts = imageUrl.split(".amazonaws.com/"); // split at .amazonaws.com/
      const imageKey = urlParts[1]; // profiles/0204912a-d85a-42e8-9197-f631b51b77a8-file (1).jpg

      if (imageKey) {
        await s3
          .deleteObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: imageKey,
          })
          .promise();
      }
    }
    //  Delete user from DynamoDB
    await dynamoDB
      .delete({
        TableName: "users",
        Key: { user_id },
      })
      .promise();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
