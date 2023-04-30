import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'USER_SERVICE',
      useFactory: (config: ConfigService) => {
        const host = config.get<string>('PRODUCT_HOST', 'localhost');
        const port = config.get<number>('PRODUCT_PORT', 3003);
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: host, port: port },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class ProductModule {}
