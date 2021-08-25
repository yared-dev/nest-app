import { PartialType } from '@nestjs/mapped-types';
import { CreateArticuloDto } from './create-articulo.dto';

export class EditArticuloDto extends PartialType(CreateArticuloDto) {}
