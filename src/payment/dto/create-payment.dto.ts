import { IsArray, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  userId: number;
  @IsArray()
  productIds: number[];
}
