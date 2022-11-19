import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateViewMentorDto } from './dto/create-view-mentor.dto';
import { UpdateViewMentorDto } from './dto/update-view-mentor.dto';

@Injectable()
export class ViewMentorService {
  constructor(private readonly prisma: PrismaService) {}

  async viewDataMentor() {
    return await this.prisma.mentor.findMany();
  }

  async findMentor(id: number) {
    return await this.prisma.mentor.findFirst({ where: { id } });
  }
}
