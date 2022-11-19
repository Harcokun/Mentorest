import { Module } from '@nestjs/common';
import { ViewMentorService } from './view-mentor.service';
import { ViewMentorController } from './view-mentor.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ViewMentorController],
  providers: [ViewMentorService],
})
export class ViewMentorModule {}
