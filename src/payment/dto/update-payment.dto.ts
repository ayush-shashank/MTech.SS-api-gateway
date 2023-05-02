import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { Order } from '../entities/order.type';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  userId: number;
  orders?: Order[];
}
