import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: number;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
  description?: string;
  image?: string;
}
