import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class MentorService {
  constructor(private readonly prisma: PrismaService) {}
  async createMentor(
    createMentorDto: CreateMentorDto,
    profile_img_url,
    bookbank_img_url,
    citizen_img_url,
  ) {
    const hashPassword = await bcrypt.hash(
      createMentorDto.password,
      parseInt(process.env.SALT),
    );
    createMentorDto.password = hashPassword;
    return await this.prisma.mentor.create({
      data: {
        ...createMentorDto,
        profile_image: profile_img_url,
        bookbank_image: bookbank_img_url,
        citizen_image: citizen_img_url,
      },
    });
  }

  async updateMentor(
    updateMentorDto: UpdateMentorDto,
    id: number,
    profile_img_url: any,
  ) {
    if (profile_img_url === undefined) {
      return await this.prisma.mentor.update({
        where: {
          id,
        },
        data: {
          ...updateMentorDto,
        },
      });
    } else {
      return await this.prisma.mentor.update({
        where: {
          id,
        },
        data: {
          ...updateMentorDto,
          profile_image: profile_img_url.Location,
        },
      });
    }
  }

  async viewAllMentor() {
    return await this.prisma.mentor.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        profile_image: true,
        is_active: true,
        profile_description: true,
        telephone_number: true,
      },
    });
  }

  async viewMentor(id: string) {
    return await this.prisma.mentor.findFirst({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        surname: true,
        profile_image: true,
        is_active: true,
        profile_description: true,
        telephone_number: true,
      },
    });
  }
}
