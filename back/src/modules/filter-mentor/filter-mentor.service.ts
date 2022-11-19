import { Injectable } from '@nestjs/common';
import { CreateFilterMentorDto } from './dto/create-filter-mentor.dto';
import { UpdateFilterMentorDto } from './dto/update-filter-mentor.dto';

@Injectable()
export class FilterMentorService {
  create(createFilterMentorDto: CreateFilterMentorDto) {
    return 'This action adds a new filterMentor';
  }

  findAll() {
    return `This action returns all filterMentor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filterMentor`;
  }

  update(id: number, updateFilterMentorDto: UpdateFilterMentorDto) {
    return `This action updates a #${id} filterMentor`;
  }

  remove(id: number) {
    return `This action removes a #${id} filterMentor`;
  }
}
