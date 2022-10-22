import { Module } from '@nestjs/common';
import { FilterMenteeService } from './filter-mentee.service';
import { FilterMenteeController } from './filter-mentee.controller';

@Module({
  controllers: [FilterMenteeController],
  providers: [FilterMenteeService]
})
export class FilterMenteeModule {}
