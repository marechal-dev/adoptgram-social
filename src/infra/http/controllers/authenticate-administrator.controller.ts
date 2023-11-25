import { AuthenticateAdministratorUseCase } from '@Domain/social-network/application/use-cases/authenticate-administrator';
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
export class AuthenticateAdministratorController {
  public constructor(
    private readonly authenticateAdministrator: AuthenticateAdministratorUseCase,
  ) {}

  @Post('/administrators')
  @HttpCode(HttpStatus.OK)
  @ApiTags('Authentication')
  @ApiCreatedResponse({
    description: 'Administrator successfully authenticated',
  })
  public async handle(@Body() body: AuthenticateDTO) {
    const result = await this.authenticateAdministrator.execute(body);

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
