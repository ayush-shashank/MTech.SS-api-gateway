import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Response } from 'express';
import { IncomingMessage } from 'http';
import { IResponseError } from 'src/interface/response-error.interface';
import { HttpExceptionResponse } from 'src/interface/http-exception-response';

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<IncomingMessage>();
    const response = ctx.getResponse<Response>();

    let message = (exception as any).message;
    let code = (exception as any).code;

    Logger.debug(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    console.log(exception);

    let status =
      (exception as any).statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse() as HttpExceptionResponse;
      message = errorResponse.message || exception.message;
      code = errorResponse.statusCode;
      status = exception.getStatus();
    }

    const error = this.GlobalResponseError(status, message, code, request);
    response.status(status).json(error);
  }

  GlobalResponseError = (
    statusCode: number,
    message: string,
    code: string,
    request: IncomingMessage,
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
