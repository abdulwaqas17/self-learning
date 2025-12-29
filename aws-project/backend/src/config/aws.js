import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION,
});

// AWS S3 ka client / instance create karta hai
export const s3 = new AWS.S3();
// DynamoDB ka client / instance create ho raha hai
export const dynamoDB = new AWS.DynamoDB.DocumentClient();

