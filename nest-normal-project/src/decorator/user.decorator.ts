import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 获取当前用户的装饰器
export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user && user[data] : user;
  },
);
