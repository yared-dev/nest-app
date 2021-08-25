import { IsNumber, IsString } from 'class-validator';
export class CreateArticuloDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  precio: number;
}
