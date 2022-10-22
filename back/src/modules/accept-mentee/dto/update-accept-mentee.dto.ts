import { PartialType } from '@nestjs/mapped-types';
import { CreateAcceptMenteeDto } from './create-accept-mentee.dto';

export class UpdateAcceptMenteeDto extends PartialType(CreateAcceptMenteeDto) {}
