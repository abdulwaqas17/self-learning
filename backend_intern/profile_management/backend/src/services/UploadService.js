import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../utils/S3";

export const generatePresignedUrl = async ({
  userId,
  fileType,
  uploadFor
}) => {
  let folder = "misc";

  if (uploadFor === "profile_pic") folder = "profile-pics";
  if (uploadFor === "company_logo") folder = "company-logos";

  const key = `${folder}/${userId}/${Date.now()}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: fileType
  });

  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: 60
  });

  return {
    uploadUrl,
    key,
    cdnUrl: `${process.env.CDN_URL}/${key}`
  };
};
