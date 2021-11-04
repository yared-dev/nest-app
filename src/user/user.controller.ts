import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto, UserRegistrationDto } from './dto';
import { Auth, User } from 'src/common/decorator';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResources, AppRoles } from 'src/app.roles';
import { User as UserEntity } from './entities';
import { EmpleadosService } from 'src/empleados/empleados.service';
import { CreateEmployeDto, EditEmployeDto } from 'src/empleados/dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly employeService: EmpleadosService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  //empleados
  @Get('empleados')
  async getEmployeMany() {
    const data = await this.employeService.getMany();
    return { data };
  }
  @Get('empleados/:id')
  async getEmployeOne(@Param('id') id: number) {
    const data = await this.employeService.getById(id);
    return { data };
  }

  @Post('empleados')
  async CreateEmployed(@Body() dto: CreateEmployeDto) {
    const data = await this.employeService.createOne(dto);
    return { message: 'Employed created', data };
  }

  @Put('empleados/:id')
  async editOneEmployed(@Param('id') id: number, @Body() dto: EditEmployeDto) {
    const data = await this.employeService.editOne(id, dto);
    return { message: 'emplotyed edited', data };
  }

  @Delete('empleados/:id')
  async deleteEmployed(@Param('id') id: number) {
    const data = await this.employeService.deleteOne(id);
    return { message: 'Employed deleted', data };
  }
  //usuarios
  @Get()
  async getMany() {
    const data = await this.userService.getMany();
    return { data };
  }
  @Post('register')
  async publicRegistration(@Body() dto: UserRegistrationDto) {
    const data = await this.userService.createOne({
      ...dto,
      roles: [AppRoles.AUTHOR],
    });
    return {
      data,
      message: 'user registered',
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.userService.getOne(id);
    return { data };
  }

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResources.USER,
  })
  @Post()
  async createOne(@Body() dto: CreateUserDto) {
    const data = await this.userService.createOne(dto);
    return { message: 'User created', data };
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResources.USER,
  })
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditUserDto,
    @User() user: UserEntity,
  ) {
    let data;
    if (
      this.rolesBuilder.can(user.roles).updateAny(AppResources.USER).granted
    ) {
      //esto es un admin
      data = await this.userService.editOne(id, dto);
      console.log('esto es un admi');
    } else {xa
      //author
      const { roles, ...rest } = dto;
      data = await this.userService.editOne(id, rest, user);
      console.log('esto es un author');
    }
    return { message: 'User edited', data };
  }

  @Auth({
    possession: 'own',
    action: 'delete',
    resource: AppResources.USER,
  })
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @User() user: UserEntity) {
    let data;
    if (
      this.rolesBuilder.can(user.roles).updateAny(AppResources.USER).granted
    ) {
      //esto es un admin
      data = await this.userService.deleteOne(id);

      console.log('esto es un admi');
    } else {
      //author
      data = await this.userService.deleteOne(id, user);
      console.log('esto es un author');
    }
    return { message: 'User deleted', data };
  }
}
