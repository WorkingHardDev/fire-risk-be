import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { subDays, subMonths } from 'date-fns';
import * as path from 'path';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import {
  AssessmentPeriod,
  FilterAssessmentDto,
} from './dto/filter-assessment.dto';
import { SaveQuestionsDto } from './dto/save-questions.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Assessment } from './entities/assessment.entity';
import { File } from './entities/file.entity';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectRepository(Assessment)
    private assessmentsRepository: Repository<Assessment>,
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private readonly s3Service: S3Service,
  ) {}

  private getStartDate(assessmentPeriod: AssessmentPeriod): Date {
    const today = new Date();

    switch (assessmentPeriod) {
      case AssessmentPeriod.LAST_WEEK:
        return subDays(today, 7); // 7 days ago
      case AssessmentPeriod.LAST_3_MONTH:
        return subMonths(today, 3); // 3 months ago
      case AssessmentPeriod.LAST_6_MONTH:
        return subMonths(today, 6); // 6 months ago
      case AssessmentPeriod.LAST_12_MONTH:
        return subMonths(today, 12); // 12 months ago
      default:
        return new Date(0);
    }
  }

  async saveQuestions(
    assessmentId: string,
    saveQuestionsDto: SaveQuestionsDto,
    files: Express.Multer.File[],
  ) {
    try {
      const fileUrls = await Promise.all(
        files.map((file) => this.s3Service.uploadFile(file)),
      );

      await this.filesRepository.save(
        fileUrls.map((url, index) => ({
          url,
          label: path.basename(
            files[index].originalname,
            path.extname(files[index].originalname),
          ),
          assessment: { id: assessmentId },
        })),
      );

      await this.assessmentsRepository.update(assessmentId, {
        questions: saveQuestionsDto.questions,
      });

      return this.findOne(assessmentId);
    } catch (error) {
      console.log('assessmentsService saveQuestions error', error);
      throw new BadRequestException(error.message);
    }
  }

  async create(
    userId: string,
    file: Express.Multer.File,
    createAssessmentDto: CreateAssessmentDto,
  ) {
    const fileUrl = await this.s3Service.uploadFile(file);

    return this.assessmentsRepository.save({
      ...createAssessmentDto,
      user: { id: userId },
      assessmentImageUrl: fileUrl,
    });
  }

  findAll(userId: string, filterAssessmentDto: FilterAssessmentDto) {
    const startDate = this.getStartDate(filterAssessmentDto.period);
    console.log('startDate', startDate);

    return this.assessmentsRepository.find({
      where: {
        user: { id: userId },
        propertyType: filterAssessmentDto.type,
        createdAt: MoreThanOrEqual(startDate),
      },
    });
  }

  findOne(id: string) {
    return this.assessmentsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateAssessmentDto: UpdateAssessmentDto) {
    try {
      await this.assessmentsRepository.update(id, updateAssessmentDto);

      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  remove(id: string) {
    return this.assessmentsRepository.delete(id);
  }
}
