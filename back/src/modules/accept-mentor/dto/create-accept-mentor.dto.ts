import { IsNumber } from 'class-validator';

export class CreateAcceptMentorDto {
  @IsNumber()
  id: number;
}
