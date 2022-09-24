import { IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  password: string;

  @IsString()
  profile_image: string;
}
