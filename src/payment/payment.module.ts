import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: 'PAYMENT_SERVICE',
      useFactory: (config: ConfigService) => {
        const host = config.get<string>('PAYMENT_HOST', 'localhost');
        const port = config.get<number>('PAYMENT_PORT', 3003);
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: host, port: port },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class PaymentModule {}
