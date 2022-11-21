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
  ) {}

  @Post('user')
  @UseInterceptors(FileInterceptor('file'))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file,
    @Req() req,
  ) {
    try {
      if (file !== undefined) {
        var s3File = await this.s3Service.uploadFile(file);
      }
      // return { Error: 'Invalid user requirement' };
      return await this.userService.createUser(createUserDto, s3File);
    } catch (err) {
      console.log(err);

      return { Error: 'Invalid user requirement' };
    }
  }

  @Post('user/delete')
  @UseGuards(AuthGuard())
  async deleteUser(@Req() req: any) {
    const user = req.user;

    return this.userService.deleteUser(user.id);
  }

  @Get('user/info')
  // @UseGuards(AuthGuard())
  async getInfo(@Req() req: any) {
    console.log(req.body);

    const user = req.user;
    const infoUser = await this.userService.getInfoUser(user.id);
    return infoUser;
  }

  @Post('user/update')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard())
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
    @UploadedFile() file,
  ) {
    if (file !== undefined) {
      var s3File = await this.s3Service.uploadFile(file);
      updateUserDto.profile_image = s3File.Location;
    }
    if (updateUserDto.password !== undefined) {
      const hashPassword = await bcrypt.hash(
        updateUserDto.password,
        parseInt(process.env.SALT),
      );

      updateUserDto.password = hashPassword;
    }

    const user = req.user;

    return this.userService.updateUser(user.id, updateUserDto);
  }

  @Post('payment')
  async genqr() {
    const payload = generatePayload('0924070909', { amount: 1 });
    const option = {
      color: {
        dark: '#000',
        light: '#fff',
      },
    };
    const qrocodstring = await qrcode.toDataURL(payload, option).then((url) => {
      return url;
    });

    return { result: qrocodstring };
  }
}
