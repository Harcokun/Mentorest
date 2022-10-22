import { Module } from '@nestjs/common';
import { AcceptMenteeService } from './accept-mentee.service';
import { AcceptMenteeController } from './accept-mentee.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCEPT_MENTEE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'accept-mentee',
          noAck: false,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AcceptMenteeController],
  providers: [AcceptMenteeService],
})
export class AcceptMenteeModule {}
