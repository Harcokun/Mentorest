import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggingMongo, LoggingDocument } from './schema/mongodb.schema';
import { MongodbDto } from './dto/mongodb.dto';

@Injectable()
export class LoggingService {
  constructor(
    @InjectModel(LoggingMongo.name)
    private readonly loggingModel: Model<LoggingDocument>,
  ) {}

  async create(createCatDto: MongodbDto): Promise<LoggingMongo> {
    const createdCat = new this.loggingModel(createCatDto);
    return createdCat.save();
  }
}
