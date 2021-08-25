import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEmployeDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNumber()
  dni: number;

  // @IsDate()
  // sgtPago: Date;

  @IsNumber()
  sueldo: number;

  // @IsDate()
  // fechaPrimerPago: Date;

  // @IsNumber()
  // defaultPago: number;
}
