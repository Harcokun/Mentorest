import { PrismaModule } from './modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
