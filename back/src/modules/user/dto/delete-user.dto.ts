import { IsInt, IsOptional, IsString } from 'class-validator';
export class DeleteUser {
  @IsInt()
  id: number;
}
