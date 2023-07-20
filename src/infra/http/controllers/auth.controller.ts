import { UsePipes, Controller, Post, Body } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import { AuthService } from '@Infra/services/auth/auth.service';
import { LoginDto } from '../dtos/auth/login.dto';

@UsePipes(ZodValidationPipe)
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
