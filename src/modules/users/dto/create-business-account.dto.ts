import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBusinessAccountDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'My Business' })
  businessName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '1234567890' })
  number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'random address line' })
  addressLine: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'New York' })
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'New York' })
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '12345' })
  postCode: string;
}
