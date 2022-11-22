import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async createBooking(
    createBookingDto: CreateBookingDto,
    s3File: any,
    user: any,
  ) {
    if (s3File !== undefined) {
      console.log(typeof s3File.Location);

      createBookingDto.payment_img = s3File.Location;
    }
    const userNumber: number = user.id;
    const booking: Prisma.BookingCreateInput = {
      date_booking: createBookingDto.date_booking,
      time_booking: createBookingDto.time_booking,
      mentor_booking: { connect: { id: createBookingDto.id_mentor } },
      user_booking: { connect: { id: userNumber } },
      payment_img: createBookingDto.payment_img,
    };
    console.log(booking);
    return await this.prisma.booking.create({ data: booking });
  }
}
