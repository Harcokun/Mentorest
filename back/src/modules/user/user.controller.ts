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

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly s3Service: S3Service,
    private readonly authService: AuthService,
  ) {}

  @Post('user')
  @UseInterceptors(FileInterceptor('file'))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file,
    @Req() req,
  ) {
    try {
      if (file) {
        var s3File = await this.s3Service.uploadFile(file);
      }

      return await this.userService.createUser(createUserDto, s3File);
    } catch (err) {
      console.log(err);

      return { Error: 'Invalid user requirement' };
    }
  }

  @Post('user/delete')
  // @UseGuards(AuthGuard())
  async deleteUser(@Req() req: any) {
    const user: any = await this.authService.validateUser(
      req.headers.token.split(' ')[1],
    );

    if (!user) {
      throw Error('Invalid token');
    }

    return this.userService.deleteUser(user.id);
  }
}
