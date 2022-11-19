import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateMentorDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  password: string;

  @IsString()
  profile_description: string;

  @IsString()
  citizenId: string;

  @IsString()
  telephone_number: string;

  @IsString()
  bookbank_number: string;

  @IsNumber()
  @Transform((obj) => {
    return parseInt(obj.value);
  })
  price_rate: number;

  @IsString()
  date_time_booking: string;
}
