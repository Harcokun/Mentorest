import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../modules/prisma/prisma.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      fromHeader: 'TOKEN',
    });
  }

  async validate(payload: any) {
    const { id, position } = payload;
    if (position === 'user') {
      var user = await this.prismaService.user.findFirst({ where: { id } });
    } else if (position === 'admin') {
      var admin = await this.prismaService.user.findFirst({ where: { id } });
    } else if (position === 'mentee') {
      var mentee = await this.prismaService.user.findFirst({ where: { id } });
    }

    if ([user, admin, mentee].filter((data) => data !== null).length === 0) {
      throw new UnauthorizedException(`user id ${id} not found`);
    } else {
      return payload;
    }
  }
}
