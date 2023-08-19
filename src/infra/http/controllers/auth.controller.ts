import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthenticateUserUseCase } from '@Application/use-cases/authenticate-user';

import { LoginDto } from '../dtos/auth/login.dto';

type LoginResponse = {
  token: string;
};

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post('sessions')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Login successful.',
  })
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
