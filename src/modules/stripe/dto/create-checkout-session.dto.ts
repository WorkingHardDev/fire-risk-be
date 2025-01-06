import { IsString } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsString()
  productId: string;
}
