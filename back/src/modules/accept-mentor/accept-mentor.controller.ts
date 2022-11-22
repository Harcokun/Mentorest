import { PrismaService } from '../prisma/prisma.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AcceptMentorService } from './accept-mentor.service';
import { CreateAcceptMentorDto } from './dto/create-accept-mentor.dto';
import { UpdateAcceptMentorDto } from './dto/update-accept-mentor.dto';

@Controller('accept-mentor')
export class AcceptMentorController {
  constructor(
    @Inject('ACCEPT_MENTOR') private readonly client: ClientProxy,
    private readonly prisma: PrismaService,
  ) {}

  async OnModuleInit() {
    await this.client.connect();
  }

  @Post()
  async acceptMentor(@Body() createAcceptMentorDto: CreateAcceptMentorDto) {
    // this.client.emit('id', createAcceptMentorDto.id);
    // return { data: 'accepted' };
    await this.prisma.mentor.update({
      where: {
        id: createAcceptMentorDto.id,
      },
      data: {
        is_active: true,
      },
    });
  }
}
