import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeerDto } from './create-employeer.dto';

export class UpdateEmployeerDto extends PartialType(CreateEmployeerDto) {}
