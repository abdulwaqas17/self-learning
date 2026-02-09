import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/Aws.js";

export const generatePresignedUrl = async ({
  fileType,
  fileName,
  uploadFor,
}) => {
  if (!["profile_pic", "company_logo"].includes(uploadFor)) {
    throw new Error("Invalid uploadFor value");
  }

  const key = `${uploadFor}/${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: 300,
  });

  return {
    key,
    uploadUrl,
    cdnUrl: `${process.env.CDN_URL}/${key}`,
  };
};






// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { s3 } from "../config/Aws.js";

// export const generatePresignedUrl = async ({
//   fileType,
//   fileName,
//   uploadFor,
// }) => {

//  if (!["profile_pic", "company_logo"].includes(uploadFor)) {
//     throw new Error("Invalid uploadFor value");
//   }

//   const key = `${uploadFor}/${Date.now()}/${fileName}`;

//   const command = new PutObjectCommand({
//     Bucket: process.env.S3_BUCKET_NAME,
//     Key: key,
//     ContentType: fileType,
//   });

//   const uploadUrl = await getSignedUrl(s3, command, {
//     expiresIn: 300,
//   });

//   return {
//     uploadUrl,
//     key,
//     cdnUrl: `${process.env.CDN_URL}/${key}`,
//   };
// };
