import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto, s3File: any) {
    const emailArray = await this.prisma.user.findMany({
      select: { email: true },
    });

    if (
      emailArray.filter((data) => data.email === createUserDto.email).length > 0
    ) {
      throw Error('Invalid email');
    }
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.SALT),
    );
    createUserDto.password = hashPassword;
    if (s3File !== undefined) {
      console.log(typeof s3File.Location);

      createUserDto.profile_image = s3File.Location;
    }

    return await this.prisma.user.create({ data: createUserDto });
  }
}
