import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';

export class EditProductoDto extends PartialType(CreateProductoDto) {}
