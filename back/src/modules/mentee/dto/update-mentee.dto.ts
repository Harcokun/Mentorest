import { IsOptional, IsString } from 'class-validator';
export class UpdateMenteeDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  profile_description: string;

  @IsOptional()
  @IsString()
  telephone_number: string;
}
