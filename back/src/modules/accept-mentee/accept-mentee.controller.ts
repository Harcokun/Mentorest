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
import { AcceptMenteeService } from './accept-mentee.service';
import { CreateAcceptMenteeDto } from './dto/create-accept-mentee.dto';
import { UpdateAcceptMenteeDto } from './dto/update-accept-mentee.dto';

@Controller('accept-mentee')
export class AcceptMenteeController {
  constructor(@Inject('ACCEPT_MENTEE') private readonly client: ClientProxy) {}

  async OnModuleInit() {
    await this.client.connect();
  }

  @Post()
  async acceptMentee(@Body() createAcceptMenteeDto: CreateAcceptMenteeDto) {
    this.client.emit('id', createAcceptMenteeDto.id);
    return { data: 'accepted' };
  }
}
