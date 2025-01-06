import { IsNotEmpty, IsString } from 'class-validator';

export class SupportMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
