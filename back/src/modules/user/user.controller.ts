import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { DeleteUser } from './dto/delete-user.dto';
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
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import qrcode from 'qrcode';
import generatePayload from 'promptpay-qr';
import * as bcrypt from 'bcrypt';
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly s3Service: S3Service,
    private readonly prisma: PrismaService,
  ) {}

  // @Post('user')
  // @UseInterceptors(FileInterceptor('file'))
  // async createUser(
  //   @Body() createUserDto: CreateUserDto,
  //   @UploadedFile() file,
  //   @Req() req,
  // ) {
  //   try {
  //     if (file !== undefined) {
  //       var s3File = await this.s3Service.uploadFile(file);
  //     }

  //     return await this.userService.createUser(createUserDto, s3File);
  //   } catch (err) {
  //     console.log(err);

  //     return { Error: 'Invalid user requirement' };
  //   }
  // }

  // @Post('user/delete')
  // @UseGuards(AuthGuard())
  // async deleteUser(@Req() req: any) {
  //   const user = req.user;

  //   return this.userService.deleteUser(user.id);
  // }

  // @Get('user/info')
  // @UseGuards(AuthGuard())
  // async getInfo(@Req() req: any) {
  //   const user = await this.prisma.user.findFirst();

  //   const infoUser = await this.userService.getInfoUser(user.id);
  //   return infoUser;
  // }

  // @Post('user/update')
  // @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(AuthGuard())
  // async updateUser(
  //   @Body() updateUserDto: UpdateUserDto,
  //   @Req() req: any,
  //   @UploadedFile() file,
  // ) {
  //   if (file !== undefined) {
  //     var s3File = await this.s3Service.uploadFile(file);
  //     updateUserDto.profile_image = s3File.Location;
  //   }
  //   if (updateUserDto.password !== undefined) {
  //     const hashPassword = await bcrypt.hash(
  //       updateUserDto.password,
  //       parseInt(process.env.SALT),
  //     );

  //     updateUserDto.password = hashPassword;
  //   }

  //   const user = req.user;

  //   return this.userService.updateUser(user.id, updateUserDto);
  // }

  // @Get('user/booking')
  // @UseGuards(AuthGuard())
  // async userBooking(@Req() req: any) {
  //   const user = req.user;

  //   return this.userService.findBooking(user.id);
  // }
}
