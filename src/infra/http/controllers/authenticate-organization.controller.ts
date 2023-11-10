import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import { IsPublicRoute } from '@Infra/auth/decorators/is-public-route.decorator';

import { AuthenticateOrganizationUseCase } from '@Domain/social-network/application/use-cases/authenticate-organization';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticateDTO } from '../dtos/authenticate.dto';

@Controller('/sessions')
@IsPublicRoute()
@UsePipes(ZodValidationPipe)
export class AuthenticateOrganizationController {
  public constructor(
    private readonly authenticateOrganization: AuthenticateOrganizationUseCase,
  ) {}

  @Post('/organizations')
  @HttpCode(HttpStatus.OK)
  @ApiTags('Authentication')
  public async handle(@Body() body: AuthenticateDTO) {
    const result = await this.authenticateOrganization.execute(body);

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
