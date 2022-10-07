import { AuthModule } from './../../auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { S3Service } from './../../common/s3Service.service';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'hero',
          protoPath: join(__dirname, '../../hero/hero.proto'),
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, S3Service],
})
export class UserModule {}
