import { IsNumber } from 'class-validator';

export class CreateAcceptMenteeDto {
  @IsNumber()
  id: number;
}
