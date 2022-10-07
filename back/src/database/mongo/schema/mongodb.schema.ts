import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoggingDocument = LoggingMongo & Document;

@Schema()
export class LoggingMongo {
  @Prop({ type: String, required: false })
  uuid: string;

  @Prop({ type: Date, required: false })
  request_at: Date;

  @Prop({ type: Date, required: false })
  response_at: Date;

  @Prop({ type: String, required: false })
  service_name: string;

  @Prop({ type: Object, required: false })
  headers: Object;

  @Prop({ type: Object, required: false })
  request: Object;

  @Prop({ type: Object, required: false })
  response: Object;
}

export const LogSchema = SchemaFactory.createForClass(LoggingMongo);
