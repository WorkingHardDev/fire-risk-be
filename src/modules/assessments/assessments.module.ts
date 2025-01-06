import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from '../s3/s3.service';
import { AssessmentsController } from './assessments.controller';
import { AssessmentsService } from './assessments.service';
import { Assessment } from './entities/assessment.entity';
import { File } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assessment, File])],
  controllers: [AssessmentsController],
  providers: [AssessmentsService, S3Service],
})
export class AssessmentsModule {}
