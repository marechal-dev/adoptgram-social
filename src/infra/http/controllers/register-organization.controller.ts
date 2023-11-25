import { OrganizationAlreadyExistsException } from '@Domain/social-network/application/use-cases/exceptions/organization-already-exists-exception';
import { RegisterOrganizationUseCase } from '@Domain/social-network/application/use-cases/register-organization';
import { InvalidCnpjException } from '@Domain/social-network/enterprise/entities/exceptions/invalid-cnpj';
import { IsPublicRoute } from '@Infra/auth/decorators/is-public-route.decorator';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

import { RegisterOrganizationDTO } from '../dtos/register-organization.dto';

@Controller('/organizations')
@IsPublicRoute()
@UsePipes(ZodValidationPipe)
export class RegisterOrganizationController {
  public constructor(
    private readonly registerOrganization: RegisterOrganizationUseCase,
  ) {}

  @Post()
  @ApiTags('Organization')
  public async handle(@Body() body: RegisterOrganizationDTO) {
    const result = await this.registerOrganization.execute(body);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case InvalidCnpjException:
          throw new BadRequestException({
            status: 'Bad Request',
            message: 'CNPJ inválido',
          });
        case OrganizationAlreadyExistsException:
          throw new ConflictException({
            status: 'Conflict',
            message: error.message,
          });
      }
    }
  }
}
