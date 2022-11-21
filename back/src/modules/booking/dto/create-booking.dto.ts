import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @Transform((obj) => {
    return parseInt(obj.value);
  })
  id_mentor: number;

  @IsString()
  date_booking: string;

  @IsString()
  time_booking: string;

  @IsOptional()
  @IsString()
  payment_img: string;
}
