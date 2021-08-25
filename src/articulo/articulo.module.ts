import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticuloController } from './articulo.controller';
import { ArticuloService } from './articulo.service';
import { Articulo } from './entities/articulo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Articulo])],

  controllers: [ArticuloController],
  providers: [ArticuloService],
})
export class ArticuloModule {}
