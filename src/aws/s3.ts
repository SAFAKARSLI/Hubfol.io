import { S3Client } from '@aws-sdk/client-s3';

const region = process.env.AWS_REGION as string;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_KEY as string;
const bucketName = process.env.AWS_PROJECT_ICONS_BUCKET_NAME as string;

if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error('Missing AWS configuration');
}

export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
