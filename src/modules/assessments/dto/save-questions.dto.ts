import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class SaveQuestionsDto {
  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      throw new Error('Invalid JSON format');
    }
  })
  @IsObject()
  @IsNotEmpty()
  @ApiProperty({ example: { question1: 'answer1', question2: 'answer2' } })
  questions: Record<string, any>;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  files?: Express.Multer.File[];
}
