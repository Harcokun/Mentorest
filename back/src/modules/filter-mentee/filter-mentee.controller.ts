import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilterMenteeService } from './filter-mentee.service';
import { CreateFilterMenteeDto } from './dto/create-filter-mentee.dto';
import { UpdateFilterMenteeDto } from './dto/update-filter-mentee.dto';

@Controller('filter-mentee')
export class FilterMenteeController {
  constructor(private readonly filterMenteeService: FilterMenteeService) {}

  @Post()
  create(@Body() createFilterMenteeDto: CreateFilterMenteeDto) {
    return this.filterMenteeService.create(createFilterMenteeDto);
  }

  @Get()
  findAll() {
    return this.filterMenteeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filterMenteeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilterMenteeDto: UpdateFilterMenteeDto) {
    return this.filterMenteeService.update(+id, updateFilterMenteeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filterMenteeService.remove(+id);
  }
}
