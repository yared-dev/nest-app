import { IsNumber, IsString } from 'class-validator';
export class CreateProductoDto {
  @IsString()
  title: string;

  @IsNumber()
  precio: number;
}
