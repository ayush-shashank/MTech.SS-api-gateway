import { IsArray, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  userId: number;
  @IsArray()
  productIds: Order[];
}

class Order {
  @IsNotEmpty()
  productId: number;
  @IsNotEmpty()
  quantity: number;
}
