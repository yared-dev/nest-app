import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employe } from './entities';
import { EmpleadosService } from './empleados.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employe])],
  providers: [EmpleadosService],
  exports: [EmpleadosService],
})
export class EmpleadosModule {}
