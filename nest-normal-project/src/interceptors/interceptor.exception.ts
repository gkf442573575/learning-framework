import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isObject } from 'class-validator';

import { Logger } from 'winston';

// 统一处理 HttpException的拦截器

interface ErrorType {
  error: Error | string;
  code?: number;
}

type ErrType = string | Error | ErrorType | HttpException;

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: ErrType) => {
        let code = 500;
        let message = '';
        if (typeof err === 'string') {
          message = err;
        } else if ('message' in err) {
          message = err.message;
        } else if (typeof err === 'object' && isObject(err) && 'error' in err) {
          message =
            typeof err.error === 'string'
              ? err.error
              : err.error.message
              ? err.error.message
              : '';
        }
        if (typeof err === 'object') {
          if ('code' in err && isObject(err)) {
            code = isNaN(Number(err.code)) ? 500 : Number(err.code);
          }
          // 如果是HttpException
          if ('getStatus' in err && typeof err.getStatus === 'function') {
            code = err.getStatus();
          }
        }
        // 信息
        // this.logger.error({
        //   message,
        // });
        // 抛出错误 会自动走到http-exeption的过滤器中，然后处理错误按照固定格式返回前端
        return throwError(() => new HttpException(message, code));
      }),
    );
  }
}
