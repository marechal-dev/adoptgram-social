import {
  UsePipes,
  UseFilters,
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { JwtService } from '@nestjs/jwt';

import { AuthenticateUserUseCase } from '@Application/use-cases/authenticate-user';

import { DomainExceptionFilter } from '../exception-filters/domain-exception.filter';
import { ZodValidationExceptionFilter } from '../exception-filters/zod-validation-exception.filter';
import { LoginDto } from '../dtos/auth/login.dto';

type LoginResponse = {
  token: string;
};

@UsePipes(ZodValidationPipe)
@UseFilters(DomainExceptionFilter, ZodValidationExceptionFilter)
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post('sessions')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    const { user } = await this.authenticateUserUseCase.execute(loginDto);

    const token = await this.jwtService.signAsync(
      {
        username: user.username,
        email: user.email,
        kind: user.kind,
      },
      {
        subject: user.id,
      },
    );

    return {
      token,
    };
  }
}
