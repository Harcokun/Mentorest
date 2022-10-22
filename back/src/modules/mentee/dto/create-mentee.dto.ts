import { IsOptional, IsString } from 'class-validator';
export class CreateMenteeDto {
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
}
