import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
// import * as dayjs from 'dayjs';
import { Logger } from 'winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const message = exception.message || '服务异常，请稍后';
    // const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    // 提交个错误消息
    this.logger.error({
      message: `${request.url} has error message: ${message}`,
    });

    response.status(status).json({
      state: 0,
      message,
      success: false,
    });
  }
}
