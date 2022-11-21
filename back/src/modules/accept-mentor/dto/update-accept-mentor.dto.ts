import { PartialType } from '@nestjs/mapped-types';
import { CreateAcceptMentorDto } from './create-accept-mentor.dto';

export class UpdateAcceptMentorDto extends PartialType(CreateAcceptMentorDto) {}
