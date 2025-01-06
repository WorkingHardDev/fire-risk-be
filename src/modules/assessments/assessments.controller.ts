import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { RequestUser } from '../types/request-user.type';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { FilterAssessmentDto } from './dto/filter-assessment.dto';
import { SaveQuestionsDto } from './dto/save-questions.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@ApiTags('Assessments')
@Controller('assessments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create assessment' })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        console.log('file', file);
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createAssessmentDto: CreateAssessmentDto,
    @Req() req: RequestUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { userId } = req.user;

    console.log('file', file);

    return this.assessmentsService.create(userId, file, createAssessmentDto);
  }

  @Post(':id/questions')
  @ApiOperation({ summary: 'Save questions' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload multiple files along with additional data',
    type: SaveQuestionsDto,
    required: true,
  })
  @UseInterceptors(
    FilesInterceptor('files', undefined, {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  createQuestions(
    @Body() saveQuestionsDto: SaveQuestionsDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') assessmentId: string,
  ) {
    console.log('saveQuestionsDto', saveQuestionsDto);
    console.log('question files', files);
    return this.assessmentsService.saveQuestions(
      assessmentId,
      saveQuestionsDto,
      files,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all assessments for user' })
  findAll(@Req() req: RequestUser, @Query() query: FilterAssessmentDto) {
    const { userId } = req.user;

    return this.assessmentsService.findAll(userId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one assessment' })
  findOne(@Param('id') id: string) {
    return this.assessmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update assessment' })
  update(
    @Param('id') id: string,
    @Body() updateAssessmentDto: UpdateAssessmentDto,
  ) {
    return this.assessmentsService.update(id, updateAssessmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete assessment' })
  remove(@Param('id') id: string) {
    return this.assessmentsService.remove(id);
  }
}
