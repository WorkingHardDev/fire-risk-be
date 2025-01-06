import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}

  s3 = new S3Client({
    credentials: this.configService.get('s3.credentials'),
    region: this.configService.get('s3.region'),
  });

  public async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: this.configService.get('s3.bucketName'),
      Key: this.generateFileName(file),
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await this.s3.send(new PutObjectCommand(params));
    console.log('s3 send result', result);
    return this.getObjectUrl(params.Key);
  }

  private getObjectUrl(key: string) {
    return `https://${this.configService.get('s3.bucketName')}.s3.${this.configService.get('s3.region')}.amazonaws.com/${key}`;
  }

  private generateFileName(file: Express.Multer.File) {
    return `${Date.now()}-${file.originalname}`;
  }
}
