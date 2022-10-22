import { PartialType } from '@nestjs/mapped-types';
import { CreateFilterMenteeDto } from './create-filter-mentee.dto';

export class UpdateFilterMenteeDto extends PartialType(CreateFilterMenteeDto) {}
