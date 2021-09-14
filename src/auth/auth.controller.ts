import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(
    @Body('username') userEmail: string,
    @Body('password') userPassword: string,
  ) {
    const loggedUser = this.authService.login(userEmail, userPassword);
    return loggedUser;
  }
}
