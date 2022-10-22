import { IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  profile_image: string;
}
