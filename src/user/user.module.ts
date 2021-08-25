import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { EmpleadosModule } from 'src/empleados/empleados.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmpleadosModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
