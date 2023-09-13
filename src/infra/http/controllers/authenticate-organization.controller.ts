import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { IsPublicRoute } from '@Infra/auth/decorators/is-public-route.decorator';

import { AuthenticateOrganizationUseCase } from '@Domain/social-network/application/use-cases/authenticate-organization';
import { AuthenticateOrganizationDto } from '../dtos/authenticate-organization.dto';

@Controller('/sessions')
@IsPublicRoute()
export class AuthenticateOrganizationController {
  public constructor(
    private readonly authenticateOrganization: AuthenticateOrganizationUseCase,
  ) {}

  @Post('/organizations')
  @HttpCode(HttpStatus.OK)
  public async handle(@Body() body: AuthenticateOrganizationDto) {
    const result = await this.authenticateOrganization.execute(body);

    if (result.isLeft()) {
      throw new ForbiddenException(result.value.message);
    }

    return result.value;
  }
}
