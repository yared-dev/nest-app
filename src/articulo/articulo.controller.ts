import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { CreateArticuloDto, EditArticuloDto } from './dto';

@Controller('articulo')
export class ArticuloController {
  constructor(private readonly articuloService: ArticuloService) {}
  @Get()
  async getMany() {
    const data = await this.articuloService.getMany();
    return {
      message: 'Peticion enviada',
      data,
    };
  }
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.articuloService.getById(id);
    return { data };
  }

  @Post()
  async createPost(@Body() dto: CreateArticuloDto) {
    const data = await this.articuloService.createOne(dto);
    return { message: 'Articulo created', data };
  }

  @Put(':id')
  async editOne(@Param('id') id: number, @Body() dto: EditArticuloDto) {
    const data = await this.articuloService.editOne(id, dto);

    return { message: 'Articulo edited', data };
  }
  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    const data = await this.articuloService.deleteOne(id);
    return { message: 'Articulo deleted', data };
  }
}
