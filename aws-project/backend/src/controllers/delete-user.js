// import { s3, dynamoDB } from "../config/aws.js";

// export const deleteUser = async (req, res) => {
//   try {
//     const { user_id } = req.params;

//     //  Get user from DynamoDB to fetch S3 image key
//     const getUser = await dynamoDB
//       .get({
//         TableName: "users",
//         Key: { user_id },
//       })
//       .promise();

//     console.log("getUsers =============>", getUser);

//     if (!getUser.Item) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     //  Delete image from S3
//     const imageUrl = getUser.Item.profileImage;

//     if (imageUrl) {
//       // Remove bucket domain part
//       const urlParts = imageUrl.split(".amazonaws.com/"); // split at .amazonaws.com/
//       const imageKey = urlParts[1]; // profiles/0204912a-d85a-42e8-9197-f631b51b77a8-file (1).jpg

//       if (imageKey) {
//         // await s3
//         //   .deleteObject({
//         //     Bucket: process.env.S3_BUCKET_NAME,
//         //     Key: imageKey,
//         //   })
//         //   .promise();
//            const imgGet = await s3
//           .getObject({
//             Bucket: process.env.S3_BUCKET_NAME,
//             Key: imageKey,
//           })
//           .promise();

//           console.log('=================imgGet===================');
//           console.log(imgGet);
//           console.log('=================imgGet===================');
//       }
//     }
//     //  Delete user from DynamoDB
//     // await dynamoDB
//     //   .delete({
//     //     TableName: "users",
//     //     Key: { user_id },
//     //   })
//     //   .promise();

//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

import { s3, dynamoDB } from "../config/aws.js";

export const deleteUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    // 1️⃣ Get user from DB
    const userResult = await dynamoDB
      .get({
        TableName: "users",
        Key: { user_id },
      })
      .promise();

      console.log('=================userResult===================');
      console.log(userResult);
      console.log('=================userResult===================');

    if (!userResult.Item) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult.Item;
    const imageUrl = user.profileImage;

    let imageKey = null;
    let imageBuffer = null;
    let imageContentType = null;

    // 2️⃣ Prepare image rollback data
    if (imageUrl) {
      imageKey = imageUrl.split(".amazonaws.com/")[1];

      // download image for rollback
      const imageResponse = await s3
        .getObject({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: imageKey,
        })
        .promise();

        console.log('================imageResponse====================');
        console.log(imageResponse);
        console.log('================imageResponse====================');

      imageBuffer = imageResponse.Body;
      imageContentType = imageResponse.ContentType;
    }

    // 3️⃣ DELETE IMAGE FROM S3
    if (imageKey) {
      await s3
        .deleteObject({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: imageKey,
        })
        .promise();
    }

    // 4️⃣ DELETE USER FROM DB
    try {
      await dynamoDB
        .delete({
          TableName: "users",
          Key: { user_id },
        })
        .promise();

        console.log('=================user delete===================');
        
      } catch (dbError) {
        // 5️⃣ ROLLBACK IMAGE (VERY IMPORTANT)
        if (imageKey && imageBuffer) {
        await s3
        .upload({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: imageKey,
            Body: imageBuffer,
            ContentType: imageContentType,
          })
          .promise();
          console.log('=================Image reupload===================');
      }

      
      console.log('==================dbError==================');
      console.log(dbError.message);
      console.log('==================dbError==================');
      throw dbError
      // throw new Error(`This error occurs ${dbError.message}`);
    }

    return res.status(200).json({
      message: "User and image deleted successfully",

    });
  } catch (error) {
    console.log('=================error===================');
    console.log(error);
    console.log('=================error===================');
    return res.status(500).json({
      message: "Delete failed, nothing changed",
      error: error.message,
    });
  }
};