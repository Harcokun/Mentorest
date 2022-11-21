import { PartialType } from '@nestjs/mapped-types';
import { CreateFilterMentorDto } from './create-filter-mentor.dto';

export class UpdateFilterMentorDto extends PartialType(CreateFilterMentorDto) {}
