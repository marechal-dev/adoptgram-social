import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

import { AuthenticateCommonUserUseCase } from '@Domain/social-network/application/use-cases/authenticate-common-user';
import { IsPublicRoute } from '@Infra/auth/decorators/is-public-route.decorator';
import { AuthenticateCommonUserDto } from '../dtos/authenticate-common-user.dto';

@Controller('/sessions')
@IsPublicRoute()
@UsePipes(ZodValidationPipe)
export class AuthenticateCommonUserController {
  public constructor(
    private readonly authenticateCommonUser: AuthenticateCommonUserUseCase,
  ) {}

  @Post('/common-users')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'Common User successfully authenticated',
  })
  public async handle(@Body() body: AuthenticateCommonUserDto) {
    const result = await this.authenticateCommonUser.execute(body);

    if (result.isLeft()) {
      const error = result.value;

      throw new ForbiddenException(error.message);
    }

    return result.value;
  }
}
