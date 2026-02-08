import { S3Client } from "@aws-sdk/client-s3";
import { CloudFrontClient } from "@aws-sdk/client-cloudfront";

export const s3 = new S3Client({
  region: process.env.AWS_REGION
});

export const cloudFront = new CloudFrontClient({
  region: process.env.AWS_REGION
});
