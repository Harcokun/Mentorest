import { S3Service } from './../../common/s3Service.service';
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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('user')
  @UseInterceptors(FileInterceptor('file'))
  async createUser(@Body() createUserDto: CreateUserDto, @UploadedFile() file) {
    try {
      if (file) {
        var s3File = await this.s3Service.uploadFile(file);
      }
      console.log(s3File);

      return await this.userService.createUser(createUserDto, s3File);
    } catch (err) {
      console.log(err);

      return { Error: 'Invalid user requirement' };
    }
  }
}
