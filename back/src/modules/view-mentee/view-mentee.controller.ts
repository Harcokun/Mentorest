import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ViewMenteeService } from './view-mentee.service';
import { CreateViewMenteeDto } from './dto/create-view-mentee.dto';
import { UpdateViewMenteeDto } from './dto/update-view-mentee.dto';

@Controller()
export class ViewMenteeController {
  constructor(private readonly viewMenteeService: ViewMenteeService) {}

  @Get('admin')
  @UseGuards(AuthGuard())
  async findAllMentee() {
    return await this.viewMenteeService.viewDataMentee();
  }
}
