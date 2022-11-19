import { Module } from '@nestjs/common';
import { FilterMentorService } from './filter-mentor.service';
import { FilterMentorController } from './filter-mentor.controller';

@Module({
  controllers: [FilterMentorController],
  providers: [FilterMentorService],
})
export class FilterMentorModule {}
