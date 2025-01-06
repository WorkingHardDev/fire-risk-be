import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AssessmentType } from './filter-assessment.dto';

export class CreateAssessmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'assessment name' })
  name: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: 'assessment completed' })
  completed?: boolean;

  @IsEnum(AssessmentType)
  @IsNotEmpty()
  @ApiProperty({ example: 'property type' })
  propertyType: AssessmentType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'country' })
  country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'address' })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'city' })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'postcode' })
  postcode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'responsible person' })
  responsiblePerson: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: ['person1', 'person2'] })
  personsConsulted: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'accessor' })
  accessor: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'person name' })
  reportValidatedBy: string;

  @IsDateString()
  @ApiProperty({ example: '2024-01-01' })
  dateOfAssessment: string;

  @IsDateString()
  @ApiProperty({ example: '2024-01-01' })
  dateOfPreviousAssessment: string;

  @IsDateString()
  @ApiProperty({ example: '2024-01-01' })
  suggestedDateForReview: string;
}
