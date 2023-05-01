import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
  description?: string;
  image?: string;
}
