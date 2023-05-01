import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(@Inject('PAYMENT_SERVICE') private client: ClientProxy) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.client.send('createPayment', createPaymentDto);

    // return 'This action adds a new payment';
  }

  findAll() {
    return this.client.send('findAllPayment', {});
    // return `This action returns all payment`;
  }

  findOne(id: number) {
    return this.client.send('findOnePayment', id);

    // return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.client.send('updatePayment', { id, updatePaymentDto });
    // return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return this.client.send('removePayment', { id });
    // return `This action removes a #${id} payment`;
  }
}
