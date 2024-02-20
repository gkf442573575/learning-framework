import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { json, urlencoded } from 'body-parser';
import * as compression from 'compression';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import * as basicAuth from 'express-basic-auth';

import { AppModule } from './app.module';

import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ResponseInterceptor, ErrorsInterceptor } from './interceptors/index';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true, // 是否允许跨域请求
    bodyParser: true,
    logger: ['warn', 'error', 'log'],
  });
  // 启动gzip
  app.use(compression());
  // 设置body的数据请求的大小
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(json({ limit: '10mb' }));
  // 日志
  const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(nestWinston);
  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter(nestWinston.logger));
  // 请求上下文
  app.useGlobalInterceptors(new ResponseInterceptor(nestWinston.logger));
  app.useGlobalInterceptors(new ErrorsInterceptor(nestWinston.logger));
  // 全局验证通道
  app.useGlobalPipes(new ValidationPipe());
  // 需要用用户密码验证的地址
  app.use(
    ['/api-docs'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.NEST_APP_BASIC_USERNAEME]:
          process.env.NEST_APP_BASIC_PASSWORD,
      },
    }),
  );
  // 接口文档
  const options = new DocumentBuilder()
    .addSecurity('Auth', {
      type: 'apiKey',
      in: 'header',
      name: 'authorization',
    })
    .setTitle('NestApp')
    .setDescription('接口API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
  // 服务启动
  await app.listen(process.env.NEST_APP_PORT, '0.0.0.0', async () => {
    console.log(`Server started at ${await app.getUrl()}`);
  });
}
bootstrap();
