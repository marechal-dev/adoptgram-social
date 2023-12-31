import { AuthenticateCommonUserUseCase } from '@Domain/social-network/application/use-cases/authenticate-common-user';
import { IsPublicRoute } from '@Infra/auth/decorators/is-public-route.decorator';
import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

import { AuthenticateDTO } from '../dtos/authenticate.dto';

@Controller('/sessions')
@IsPublicRoute()
@UsePipes(ZodValidationPipe)
export class AuthenticateCommonUserController {
  public constructor(
    private readonly authenticateCommonUser: AuthenticateCommonUserUseCase,
  ) {}

  @Post('/common-users')
  @HttpCode(HttpStatus.OK)
  @ApiTags('Authentication')
  @ApiCreatedResponse({
    description: 'Common User successfully authenticated',
  })
  public async handle(@Body() body: AuthenticateDTO) {
    const result = await this.authenticateCommonUser.execute(body);

    if (result.isLeft()) {
      const error = result.value;

      throw new ForbiddenException(error.message);
    }

    const { accessToken, userID } = result.value;

    return {
      userID,
      accessToken,
    };
  }
}
