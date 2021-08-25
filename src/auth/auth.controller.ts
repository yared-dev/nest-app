import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User, Auth } from 'src/common/decorator';
import { User as UserEntity } from 'src/user/entities';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('Login')
  login(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      message: 'login exitoso',
      data,
    };
  }
  @Auth()
  @Get('profile')
  profile() {
    return 'profile';
  }
}
