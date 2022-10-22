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
import { MenteeService } from './mentee.service';
import { CreateMenteeDto } from './dto/create-mentee.dto';
import { UpdateMenteeDto } from './dto/update-mentee.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { S3Service } from 'src/common/s3Service.service';
import * as bcrypt from 'bcrypt';
@Controller()
export class MenteeController {
  constructor(
    private readonly menteeService: MenteeService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('mentee')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profile_image', maxCount: 1 },
      { name: 'bookbank_image', maxCount: 1 },
      { name: 'citizen_image', maxCount: 1 },
    ]),
  )
  async createMentee(
    @Body() createMenteeDto: CreateMenteeDto,
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

      return await this.menteeService.createMentee(
        createMenteeDto,
        profile_img_url.Location,
        bookbankImage_url.Location,
        citizen_image_url.Location,
      );
    } catch (err) {
      console.log(err);

      return { Error: 'Invalid user requirement' };
    }
  }

  @Post('mentee/update')
  @UseGuards(AuthGuard())
  async updateMentee(@Body() updateMenteeDto: UpdateMenteeDto, @Req() req) {
    const user = req.user;
    console.log(updateMenteeDto);

    if (updateMenteeDto.password !== undefined) {
      const hashPassword = await bcrypt.hash(
        updateMenteeDto.password,
        parseInt(process.env.SALT),
      );
      updateMenteeDto.password = hashPassword;
    }
    return await this.menteeService.updateMentee(updateMenteeDto, user.id);
  }
  catch(err) {
    console.log(err);

    return { Error: 'Invalid user requirement' };
  }
}
