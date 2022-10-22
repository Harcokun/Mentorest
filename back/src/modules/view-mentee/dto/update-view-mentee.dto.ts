import { PartialType } from '@nestjs/mapped-types';
import { CreateViewMenteeDto } from './create-view-mentee.dto';

export class UpdateViewMenteeDto extends PartialType(CreateViewMenteeDto) {}
