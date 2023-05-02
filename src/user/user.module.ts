import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_SERVICE',
      useFactory: (config: ConfigService) => {
        const host = config.get<string>('USER_HOST', 'localhost');
        const port = +config.get<number>('USER_PORT', 3001);
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: host, port: port },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class UserModule {}
