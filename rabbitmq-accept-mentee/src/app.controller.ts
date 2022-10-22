import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @EventPattern('id')
  async acceptMentee(data: Record<string, unknown>) {
    const number = Number(data);
    await this.prisma.mentee.update({
      where: {
        id: number,
      },
      data: {
        is_active: true,
      },
    });
  }
}
