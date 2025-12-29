import {v4 as uuid} from "uuid";
import { s3 } from "../config/aws.js";


export const uploadToS3 = async (file) => {

  const parmas = {
    Bucket : process.env.S3_BUCKET_NAME,
    Key : `profiles/${uuid()}-${file.originalname}`,
    Body : file.buffer,
    Content_type : file.mimetype
  }

  const uploadResult = await s3.upload(parmas).promise();
  return uploadResult.Location;

}