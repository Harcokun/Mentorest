import { LoggingInterceptor } from './middlewares/logging.interceptor';
import { PrismaModule } from './modules/prisma/prisma.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LoggingModule } from './database/mongo/mongodb.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingService } from './database/mongo/mongodb.service';
import {
  LoggingMongo,
  LogSchema,
} from './database/mongo/schema/mongodb.schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URL,
      }),
    }),
    MongooseModule.forFeature([{ name: LoggingMongo.name, schema: LogSchema }]),
    AuthModule,
    UserModule,
    PrismaModule,
    LoggingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
