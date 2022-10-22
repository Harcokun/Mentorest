import { Injectable } from '@nestjs/common';
import { CreateFilterMenteeDto } from './dto/create-filter-mentee.dto';
import { UpdateFilterMenteeDto } from './dto/update-filter-mentee.dto';

@Injectable()
export class FilterMenteeService {
  create(createFilterMenteeDto: CreateFilterMenteeDto) {
    return 'This action adds a new filterMentee';
  }

  findAll() {
    return `This action returns all filterMentee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filterMentee`;
  }

  update(id: number, updateFilterMenteeDto: UpdateFilterMenteeDto) {
    return `This action updates a #${id} filterMentee`;
  }

  remove(id: number) {
    return `This action removes a #${id} filterMentee`;
  }
}
