import { AuthModule } from '../../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { MentorService } from './mentor.service';
import { MentorController } from './mentor.controller';
import { S3Service } from 'src/common/s3Service.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [MentorController],
  providers: [MentorService, S3Service],
})
export class MentorModule {}
