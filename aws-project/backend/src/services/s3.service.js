import { s3 } from "../config/aws.js";
import { v4 as uuid } from "uuid";

console.log('================process.env.S3_BUCKET_NAME333====================');
console.log(process.env.S3_BUCKET_NAME);
console.log('================process.env.S3_BUCKET_NAME===================='); 
 
export const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `profiles/${uuid()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location;
};
