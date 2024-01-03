import { FindOrganizationDetailsByUsernameUseCase } from '@Domain/social-network/application/use-cases/find-organization-details-by-username';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { OrganizationDetailsPresenter } from '../presenters/organization-details-presenter';

@Controller('/organizations/:username/details')
export class FindOrganizationDetailsByUsernameController {
  public constructor(
    private readonly findOrganizationDetailsByUsername: FindOrganizationDetailsByUsernameUseCase,
  ) {}

  @Get()
  @AllowedRoles('Admin', 'Organization', 'CommonUser')
  @UseGuards(RolesGuard)
  @ApiTags('Organization')
  @ApiBearerAuth()
  public async handle(@Param('username') username: string) {
    const result = await this.findOrganizationDetailsByUsername.execute({
      username,
    });

    console.log(result);

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }

    return {
      details: OrganizationDetailsPresenter.toHTTP(
        result.value.organizationDetails,
      ),
    };
  }
}
