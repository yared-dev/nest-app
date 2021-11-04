import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto, EditProductoDto } from './dto';
import { User } from 'src/user/entities';

import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}
  async getMany() {
    return await this.productoRepository.find();
  }

  async getById(id: number, author?: User) {
    const producto = await this.productoRepository
      .findOne(id)
      .then((p) => (!author ? p : !!p && author.id === p.author.id ? p : null));
    if (!producto)
      throw new NotFoundException('Post does not exist or unauthorized');
    return producto;
  }

  async createOne(dto: CreateProductoDto, author: User) {
    const producto = this.productoRepository.create({ ...dto, author });
    return await this.productoRepository.save(producto);
  }

  async editOne(id: number, dto: EditProductoDto, author?: User) {
    const producto = await this.getById(id, author);
    const editedProducto = Object.assign(producto, dto);
    return await this.productoRepository.save(editedProducto);
  }

  async deleteOne(id: number, author?: User) {
    const producto = await this.getById(id, author);
    return await this.productoRepository.remove(producto);
  }
}
