import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../modules/prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.prismaService.user.findFirst({
      where: { email: createAuthDto.email },
      select: { password: true, id: true },
    });
    if (!user) {
      throw new NotFoundException('Invalid email');
    } else {
    }
    const isValidPwd = await bcrypt.compare(
      createAuthDto.password,
      user.password,
    );
    if (isValidPwd) {
      const token = this.jwtService.sign({
        id: user.id,
      });
      return { token };
    } else {
      throw new ConflictException('Invalid password');
    }
  }

  async validateUser(data: any) {
    return this.jwtService.decode(data);

    // this.jwtService.decode();
  }
}
