import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { Response } from 'express';
import { IResponseError } from 'src/interface/response-error.interface';

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  // catch(exception: T, host: ArgumentsHost) {}
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = (exception as any).message;
    const code = (exception as any).code;

    Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    console.log(exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = (exception as HttpException).getStatus();
    }

    response
      .status(status)
      .json(this.GlobalResponseError(status, message, code, request));
  }
  GlobalResponseError: (
    statusCode: number,
    message: string,
    code: string,
    request: Request,
  ) => IResponseError = (
    statusCode: number,
    message: string,
    code: string,
    request: Request,
  ): IResponseError => {
    return {
      statusCode,
      message,
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };
  };
}
