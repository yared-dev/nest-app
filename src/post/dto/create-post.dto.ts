import { PostCategory, PostEmployed } from '../enums';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { EnumToString } from '../../common/helper/enumToString';
export class CreatePostDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  modelo: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  telefono: number;

  @IsBoolean()
  status: boolean;

  @IsEnum(PostEmployed, {
    message: `Opcion invalida. las opciones son ${EnumToString(PostEmployed)}`,
  })
  trabajador: PostEmployed;

  @IsEnum(PostCategory, {
    message: `Opcion invalida. las opciones son ${EnumToString(PostCategory)}`,
  })
  urgencia: PostCategory;
}
