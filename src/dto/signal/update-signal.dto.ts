import { PartialType } from '@nestjs/mapped-types';
import { CreateSignalDto } from './create-signal.dto';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels()
export class UpdateSignalDto extends PartialType(CreateSignalDto) { }


