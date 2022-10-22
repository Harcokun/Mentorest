import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMenteeDto } from './dto/create-mentee.dto';
import { UpdateMenteeDto } from './dto/update-mentee.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class MenteeService {
  constructor(private readonly prisma: PrismaService) {}
  async createMentee(
    createMenteeDto: CreateMenteeDto,
    profile_img_url,
    bookbank_img_url,
    citizen_img_url,
  ) {
    const hashPassword = await bcrypt.hash(
      createMenteeDto.password,
      parseInt(process.env.SALT),
    );
    createMenteeDto.password = hashPassword;
    return await this.prisma.mentee.create({
      data: {
        ...createMenteeDto,
        profile_image: profile_img_url,
        bookbank_image: bookbank_img_url,
        citizen_image: citizen_img_url,
      },
    });
  }

  async updateMentee(updateMenteeDto: UpdateMenteeDto, id: number) {
    return await this.prisma.mentee.update({
      where: {
        id,
      },
      data: {
        ...updateMenteeDto,
      },
    });
  }
}
