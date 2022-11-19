import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { AuthModule } from 'src/auth/auth.module';
import { S3Service } from 'src/common/s3Service.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [BookingController],
  providers: [BookingService, S3Service],
})
export class BookingModule {}
