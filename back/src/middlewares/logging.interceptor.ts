import {
  LoggingMongo,
  LoggingDocument,
} from '../database/mongo/schema/mongodb.schema';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Req,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Observable, map } from 'rxjs';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    // @InjectModel(LoggingMongo.name)
    // private readonly loggingModel: Model<LoggingDocument>,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request_at = new Date();
    if (context.switchToHttp().getRequest().url == '/auth/logout') {
      return next.handle();
    }
    return next.handle().pipe(
      map(async (value) => {
        const req = context.switchToHttp().getRequest();
        const serviceName = req.url;
        const uuid = uuidv4();
        const response_at = new Date();
        const header = req.headers;
        const request = req.body;
        const response = value;
        // await this.loggingModel.create({
        //   req,
        //   request_at,
        //   serviceName,
        //   uuid,
        //   response_at,
        //   header,
        //   request,
        //   response,
        // });
        return value;
      }),
    );
  }
}
