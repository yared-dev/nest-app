import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticuloDto, EditArticuloDto } from './dto';
import { Articulo } from './entities/articulo.entity';

@Injectable()
export class ArticuloService {
  constructor(
    @InjectRepository(Articulo)
    private readonly articuloRepository: Repository<Articulo>,
  ) {}
  async getMany() {
    return await this.articuloRepository.find();
  }
  async getById(id: number) {
    const articulo = await this.articuloRepository.findOne(id);
    if (!articulo)
      throw new NotFoundException('articulo does not exist or unauthorized');
    return articulo;
  }

  async createOne(dto: CreateArticuloDto) {
    const articulo = this.articuloRepository.create(dto as any);
    return await this.articuloRepository.save(articulo);
  }

  async editOne(id: number, dto: EditArticuloDto) {
    const articulo = await this.getById(id);
    const editedarticulo = Object.assign(articulo, dto);
    return await this.articuloRepository.save(editedarticulo);
  }

  async deleteOne(id: number) {
    const articulo = await this.getById(id);
    return await this.articuloRepository.remove(articulo);
  }
}
