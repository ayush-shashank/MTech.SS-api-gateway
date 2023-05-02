import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(@Inject('PAYMENT_SERVICE') private client: ClientProxy) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.client.send('createPayment', createPaymentDto);
  }

  findAll() {
    return this.client.send('findAllPayment', {});
  }

  findOne(id: number) {
    return this.client.send('findOnePayment', id);
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.client.send('updatePayment', { ...updatePaymentDto, id });
  }

  remove(id: number) {
    return this.client.send('removePayment', { id });
  }
}
