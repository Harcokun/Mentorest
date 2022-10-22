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
    const admin = await this.prismaService.admin.findFirst({
      where: { email: createAuthDto.email },
      select: { password: true, id: true },
    });

    const mentee = await this.prismaService.mentee.findFirst({
      where: { email: createAuthDto.email },
      select: { password: true, id: true },
    });
    if ([user, admin, mentee].filter((data) => data !== null).length === 0) {
      throw new NotFoundException('Invalid email');
    } else {
    }

    var isValidPwd;
    if (user)
      isValidPwd = await bcrypt.compare(createAuthDto.password, user.password);

    if (admin)
      isValidPwd = await bcrypt.compare(createAuthDto.password, admin.password);
    if (mentee)
      isValidPwd = await bcrypt.compare(
        createAuthDto.password,
        mentee.password,
      );

    if (isValidPwd) {
      const token = this.jwtService.sign({
        id: user ? user.id : admin ? admin.id : mentee.id,
        position: user ? 'user' : admin ? 'admin' : 'mentee',
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
