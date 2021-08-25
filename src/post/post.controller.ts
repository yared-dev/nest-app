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

import { AppResources } from 'src/app.roles';
import { PostService } from './post.service';
import { CreatePostDto, EditPostDto } from './dto';
import { Auth, User } from 'src/common/decorator';
import { User as UserEntity } from 'src/user/entities';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Get()
  async getMany() {
    const data = await this.postService.getMany();
    return {
      message: 'Peticion enviada',
      data,
    };
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.postService.getById(id);
    return { data };
  }

  @Auth({
    resource: AppResources.POST,
    action: 'create',
    possession: 'own',
  })
  @Post()
  async createPost(@Body() dto: CreatePostDto, @User() author: UserEntity) {
    const data = await this.postService.createOne(dto, author);
    return { message: 'Post created', data };
  }

  @Auth({
    resource: AppResources.POST,
    action: 'update',
    possession: 'own',
  })
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditPostDto,
    @User() author: UserEntity,
  ) {
    let data;
    if (
      this.rolesBuilder.can(author.roles).updateAny(AppResources.POST).granted
    ) {
      // Puede editar cualquier POST...
      data = await this.postService.editOne(id, dto);
    } else {
      // Puede editar solo los propios...
      data = await this.postService.editOne(id, dto, author);
    }

    return { message: 'Post edited', data };
  }

  @Auth({
    resource: AppResources.POST,
    action: 'delete',
    possession: 'own',
  })
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @User() author: UserEntity) {
    let data;

    if (
      this.rolesBuilder.can(author.roles).deleteAny(AppResources.POST).granted
    ) {
      data = await this.postService.deleteOne(id);
    } else {
      data = await this.postService.deleteOne(id, author);
    }
    return { message: 'Post deleted', data };
  }
}
