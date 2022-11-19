import { IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdateMentorDto {
  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  profile_description: string;

  @IsOptional()
  @IsString()
  telephone_number: string;

  @IsOptional()
  @IsNumber()
  price_rate: number;

  @IsOptional()
  @IsString()
  date_time_booking: string;
}
