import { FindOrganizationByIdUseCase } from '@Domain/social-network/application/use-cases/find-organization-by-id';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { OrganizationPresenter } from '../presenters/organization-presenter';

@Controller('/organizations')
@UsePipes(ZodValidationPipe)
export class FindOrganizationByIdController {
  public constructor(
    private readonly findOrganizationById: FindOrganizationByIdUseCase,
  ) {}

  @Get('/:id')
  @ApiTags('Organization')
  @ApiBearerAuth()
  @AllowedRoles('Admin', 'Organization', 'CommonUser')
  @UseGuards(RolesGuard)
  public async handle(@Param('id') organizationID: string) {
    const result = await this.findOrganizationById.execute({
      organizationID,
    });

    if (result.isLeft()) {
      throw new NotFoundException({
        status: 'Not Found',
        message: result.value.message,
      });
    }

    return {
      organization: OrganizationPresenter.toHTTP(result.value.organization),
    };
  }
}
