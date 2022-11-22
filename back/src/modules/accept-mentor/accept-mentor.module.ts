import { Module } from '@nestjs/common';
import { AcceptMentorService } from './accept-mentor.service';
import { AcceptMentorController } from './accept-mentor.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'ACCEPT_MENTOR',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'accept-mentee',
          noAck: false,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AcceptMentorController],
  providers: [AcceptMentorService],
})
export class AcceptMentorModule {}
