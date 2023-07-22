import { UsePipes, Controller, Post, Body, UseFilters } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import { AuthService } from '@Infra/services/auth/auth.service';
import { LoginDto } from '../dtos/auth/login.dto';
import { ZodValidationExceptionFilter } from '../exception-filters/zod-validation-exception.filter';
import { DomainExceptionFilter } from '../exception-filters/domain-exception.filter';

@UsePipes(ZodValidationPipe)
@UseFilters(DomainExceptionFilter, ZodValidationExceptionFilter)
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
