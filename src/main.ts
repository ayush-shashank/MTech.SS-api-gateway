import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './filter/global-exception.filter';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as fs from 'fs';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const host = config.get<string>('API_HOST', 'localhost');
  const port = +config.get<number>('API_PORT', 3000);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  swaggerSetup(app);
  await app.listen(port, host, () => {
    console.log(`API Service Listening on http://${host}:${port}`);
  });
}

function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Microservice API Gateway')
    .setDescription('The Gateway API description')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
