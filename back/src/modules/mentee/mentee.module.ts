import { AuthModule } from './../../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { MenteeService } from './mentee.service';
import { MenteeController } from './mentee.controller';
import { S3Service } from 'src/common/s3Service.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [MenteeController],
  providers: [MenteeService, S3Service],
})
export class MenteeModule {}
