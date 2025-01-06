import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  bucketName: process.env.AWS_BUCKET_NAME,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
}));
