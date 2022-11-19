import { PartialType } from '@nestjs/mapped-types';
import { CreateViewMentorDto } from './create-view-mentor.dto';

export class UpdateViewMentorDto extends PartialType(CreateViewMentorDto) {}
