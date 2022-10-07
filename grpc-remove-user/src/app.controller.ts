import { PrismaService } from './prisma/prisma.service';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

interface HeroById {
  id: number;
}

interface Hero {
  data: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @GrpcMethod('HeroesService', 'FindOne')
  async findOne(
    data: HeroById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<Hero> {
    const user = await this.prisma.user.findFirst({
      where: { id: data.id },
    });

    if (user !== null) {
      await this.prisma.user.delete({
        where: {
          id: data.id,
        },
      });
      return {
        data: 'Successfully delete user',
      };
    } else {
      return {
        data: 'Invalid User id',
      };
    }
  }
}
