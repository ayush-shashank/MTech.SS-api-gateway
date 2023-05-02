import { IsArray, IsNotEmpty } from 'class-validator';
import { Order } from '../entities/order.type';

export class CreatePaymentDto {
  @IsNotEmpty()
  userId: number;
  @IsArray()
  orders: Order[];
}
