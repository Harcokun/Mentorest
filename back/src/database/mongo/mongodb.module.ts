import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingService } from './mongodb.service';
import { LoggingMongo, LogSchema } from './schema/mongodb.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LoggingMongo.name, schema: LogSchema }]),
  ],
  providers: [LoggingService],
  controllers: [],
  exports: [LoggingService],
})
export class LoggingModule {}
