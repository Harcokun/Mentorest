import { Module } from '@nestjs/common';
import { ViewMenteeService } from './view-mentee.service';
import { ViewMenteeController } from './view-mentee.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ViewMenteeController],
  providers: [ViewMenteeService],
})
export class ViewMenteeModule {}
