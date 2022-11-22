import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { MentorService } from './mentor.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { S3Service } from 'src/common/s3Service.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
@Controller()
export class MentorController {
  constructor(
    private readonly mentorService: MentorService,
    private readonly s3Service: S3Service,
    private readonly prisma: PrismaService,
  ) {}

  @Post('mentor')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profile_image', maxCount: 1 },
      { name: 'bookbank_image', maxCount: 1 },
      { name: 'citizen_image', maxCount: 1 },
    ]),
  )
  async createMentor(
    @Body() createMentorDto: CreateMentorDto,
    @UploadedFiles()
    files: {
      profile_image?: Express.Multer.File;
      bookbank_image?: Express.Multer.File;
      citizen_image?: Express.Multer.File;
    },
    @Req() req,
  ) {
    try {
      if (
        [
          files.profile_image,
          files.bookbank_image,
          files.citizen_image,
        ].includes(undefined)
      ) {
        return { Error: 'Invalid user requirement' };
      }

      const profile_img_url = await this.s3Service.uploadFile(
        files.profile_image[0],
      );
      const bookbankImage_url = await this.s3Service.uploadFile(
        files.bookbank_image[0],
      );
      const citizen_image_url = await this.s3Service.uploadFile(
        files.citizen_image[0],
      );

      return await this.mentorService.createMentor(
        createMentorDto,
        profile_img_url.Location,
        bookbankImage_url.Location,
        citizen_image_url.Location,
      );
    } catch (err) {
      console.log(err);

      return { Error: 'Invalid user requirement' };
    }
  }

  @Get('view-all-mentor')
  async viewAllMentor() {
    const data = await this.mentorService.viewAllMentor();

    return data;
  }

  @Post('mentor/update')
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'profile_image', maxCount: 1 }]),
  )
  async updateMentor(
    @Body() updateMentorDto: UpdateMentorDto,
    @UploadedFiles()
    files: {
      profile_image?: Express.Multer.File;
    },
    @Req() req,
  ) {
    const user = req.user;
    console.log(updateMentorDto);
    updateMentorDto;
    if (updateMentorDto.password !== undefined) {
      const hashPassword = await bcrypt.hash(
        updateMentorDto.password,
        parseInt(process.env.SALT),
      );

      var profile_img_url = undefined;
      if (files.profile_image !== undefined && files.profile_image[0]) {
        profile_img_url = await this.s3Service.uploadFile(
          files.profile_image[0],
        );
      }

      updateMentorDto.password = hashPassword;
    }
    return await this.mentorService.updateMentor(
      updateMentorDto,
      user.id,
      profile_img_url,
    );
  }
  catch(err) {
    console.log(err);

    return { Error: 'Invalid user requirement' };
  }

  @Get('view-mentor/:id')
  async viewMentor(@Param('id') id: string) {
    return await this.mentorService.viewMentor(id);
  }

  @Get('mentor/booking')
  @UseGuards(AuthGuard())
  async getMentorBooking(@Req() req) {
    const user = req.user;
    return await this.prisma.booking.findMany({
      where: {
        id_mentor: user.id,
      },
      include: {
        user_booking: {
          select: {
            name: true,
            surname: true,
          },
        },
      },
    });
  }

  @Post('mentorInfo')
  @UseGuards(AuthGuard())
  async getMentorInfo(@Req() req) {
    const user = req.user;
    return await this.prisma.mentor.findFirst({
      where: {
        id: user.id,
      },
    });
  }

  @Post('sendlink')
  @UseGuards(AuthGuard())
  async sendLink(@Body() body) {
    await this.prisma.booking.update({
      where: {
        id: body.id,
      },
      data: {
        url_conferrence: body.link,
      },
    });
    return {
      success: true,
    };
  }
}
