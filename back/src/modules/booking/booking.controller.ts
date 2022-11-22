import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  Req,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/common/s3Service.service';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller()
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('booking')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard())
  async createBooking(
    @Body() createUserDto: CreateBookingDto,
    @UploadedFile() file,
    @Req() req,
  ) {
    try {
      const user = req.user;
      if (file !== undefined) {
        var s3File = await this.s3Service.uploadFile(file);
      }
      // return { Error: 'Invalid user requirement' };
      return await this.bookingService.createBooking(
        createUserDto,
        s3File,
        user,
      );
    } catch (err) {
      console.log(err);

      return { Error: 'Invalid user requirement' };
    }
  }
}
