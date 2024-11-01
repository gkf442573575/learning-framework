import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

// log
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
const format = winston.format;

import * as dayjs from 'dayjs';

import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalModule } from './global/global.module';
import { WsGateway } from './socket/ws.gateway';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './routes/user/user.module';
import { UserController } from './routes/user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return JSON.parse(process.env.NEST_APP_DATABASE);
      },
    }),
    WinstonModule.forRoot({
      exitOnError: false,
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.splat(),
        format.printf((info) => {
          return `[${process.env.NEST_APP_NAME}] - ${dayjs(
            info.timestamp,
          ).format('YYYY-MM-DD HH:mm:ss')} - [${info.level.toUpperCase()}] ${
            info.label ? ` - [${info.label}]` : ''
          }- ${info.message}`;
        }),
      ),
      transports: [
        new DailyRotateFile({
          filename: 'logs/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '30m',
          maxFiles: '30d',
        }),
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GlobalModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, WsGateway], // WsGateway
})
export class AppModule {}
