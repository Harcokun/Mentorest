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
import { ViewMentorService } from './view-mentor.service';
import { CreateViewMentorDto } from './dto/create-view-mentor.dto';
import { UpdateViewMentorDto } from './dto/update-view-mentor.dto';
import qrcode from 'qrcode';
import generatePayload from 'promptpay-qr';

@Controller()
export class ViewMentorController {
  constructor(private readonly viewMentorService: ViewMentorService) {}

  // @Get('admin')
  // @UseGuards(AuthGuard())
  // async findAllMentor() {
  //   return await this.viewMentorService.viewDataMentor();
  // }

  // @Get('mentor/:id')
  // async findMentor(@Param('id') id: string) {
  //   const mentorData = await this.viewMentorService.findMentor(+id);
  //   const qrCode = await this.genqr(mentorData.price_rate);

  //   return { qrCode: qrCode.result, mentorData };
  // }

  // async genqr(amount: number) {
  //   const payload = generatePayload('0924070909', { amount: amount });
  //   const option = {
  //     color: {
  //       dark: '#000',
  //       light: '#fff',
  //     },
  //   };
  //   const qrocodstring = await qrcode.toDataURL(payload, option).then((url) => {
  //     return url;
  //   });

  //   return { result: qrocodstring };
  // }
}
