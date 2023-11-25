import { FetchManyPetsByOwnerOrganizationIdUseCase } from '@Domain/social-network/application/use-cases/fetch-many-pets-by-owner-organization-id';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { PetPresenter } from '../presenters/pet-presenter';

@Controller('/organizations')
export class FetchManyPetsByOwnerOrganizationIdController {
  public constructor(
    private readonly fetchManyPetsByOwnerOrganizationID: FetchManyPetsByOwnerOrganizationIdUseCase,
  ) {}

  @Get('/:id/pets')
  @AllowedRoles('Admin', 'CommonUser', 'Organization')
  @UseGuards(RolesGuard)
  @ApiTags('Organization')
  @ApiBearerAuth()
  public async handle(@Param('id') ownerOrganizationID: string) {
    const result = await this.fetchManyPetsByOwnerOrganizationID.execute({
      ownerOrganizationID,
    });

    if (result.isRight()) {
      return result.value.pets.map(PetPresenter.toHTTP);
    }
  }
}
