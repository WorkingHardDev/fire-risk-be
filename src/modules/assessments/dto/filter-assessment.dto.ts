import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum AssessmentType {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
}

export enum AssessmentPeriod {
  LAST_WEEK = 'last_week',
  LAST_3_MONTH = 'last_3_month',
  LAST_6_MONTH = 'last_6_month',
  LAST_12_MONTH = 'last_12_month',
}

export class FilterAssessmentDto {
  @IsOptional()
  @IsString()
  @IsEnum(AssessmentType)
  type?: AssessmentType;

  @IsOptional()
  @IsString()
  @IsEnum(AssessmentPeriod)
  period?: AssessmentPeriod;
}
