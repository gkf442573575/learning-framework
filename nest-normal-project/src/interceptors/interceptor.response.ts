import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

import { Logger } from 'winston';

// 统一返回的数据格式

export interface DataResponse<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, DataResponse<T>>
{
  constructor(private logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<DataResponse<any>> {
    return next.handle().pipe(
      map((data) => {
        // 设置response的状态
        const ctx = context.switchToHttp();
        const res = ctx.getResponse<Response>();
        res.status(200);
        return {
          state: 1,
          data,
          success: true,
          message: '成功',
        };
      }),
    );
  }
}
