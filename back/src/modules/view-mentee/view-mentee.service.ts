import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateViewMenteeDto } from './dto/create-view-mentee.dto';
import { UpdateViewMenteeDto } from './dto/update-view-mentee.dto';

@Injectable()
export class ViewMenteeService {
  constructor(private readonly prisma: PrismaService) {}

  async viewDataMentee() {
    return await this.prisma.mentee.findMany();
  }
}
