import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductoDto, EditProductoDto } from './dto';
import { ProductoService } from './producto.service';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { User as UserEntity } from 'src/user/entities';
import { Auth, User } from 'src/common/decorator';
import { AppResources } from 'src/app.roles';

@Controller('producto')
export class ProductoController {
  constructor(
    private readonly productoService: ProductoService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}
  @Get()
  async getMany() {
    const data = await this.productoService.getMany();
    return {
      message: 'Peticion enviada',
      data,
    };
  }
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productoService.getById(id);
    return { data };
  }

  @Auth({
    resource: AppResources.PRODUCTO,
    action: 'create',
    possession: 'own',
  })
  @Post()
  async createProducto(
    @Body() dto: CreateProductoDto,
    @User() author: UserEntity,
  ) {
    const data = await this.productoService.createOne(dto, author);
    return { message: 'Producto created', data };
  }

  @Auth({
    resource: AppResources.PRODUCTO,
    action: 'update',
    possession: 'own',
  })
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditProductoDto,
    @User() author: UserEntity,
  ) {
    let data;
    if (
      this.rolesBuilder.can(author.roles).updateAny(AppResources.PRODUCTO)
        .granted
    ) {
      data = await this.productoService.editOne(id, dto);
    } else {
      data = await this.productoService.editOne(id, dto, author);
    }

    return { message: 'PRODUCTO edited', data };
  }

  @Auth({
    resource: AppResources.PRODUCTO,
    action: 'delete',
    possession: 'own',
  })
  @Delete(':id')
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @User() author: UserEntity) {
    let data;

    if (
      this.rolesBuilder.can(author.roles).deleteAny(AppResources.PRODUCTO)
        .granted
    ) {
      data = await this.productoService.deleteOne(id);
    } else {
      data = await this.productoService.deleteOne(id, author);
    }
    return { message: 'Producto deleted', data };
  }
}
