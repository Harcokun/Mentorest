import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FilterMentorService } from './filter-mentor.service';
import { CreateFilterMentorDto } from './dto/create-filter-mentor.dto';
import { UpdateFilterMentorDto } from './dto/update-filter-mentor.dto';

@Controller('filter-mentor')
export class FilterMentorController {
  constructor(private readonly filterMentorService: FilterMentorService) {}

  @Post()
  create(@Body() createFilterMentorDto: CreateFilterMentorDto) {
    return this.filterMentorService.create(createFilterMentorDto);
  }

  @Get()
  findAll() {
    return this.filterMentorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filterMentorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFilterMentorDto: UpdateFilterMentorDto,
  ) {
    return this.filterMentorService.update(+id, updateFilterMentorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filterMentorService.remove(+id);
  }
}
