import { FindPetByIdUseCase } from '@Domain/social-network/application/use-cases/find-pet-by-id';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { PetPresenter } from '../presenters/pet-presenter';

@Controller('/pets')
export class FindPetByIdController {
  public constructor(private readonly findPetByID: FindPetByIdUseCase) {}

  @Get('/:id')
  @AllowedRoles('Admin', 'CommonUser', 'Organization')
  @UseGuards(RolesGuard)
  @ApiTags('Pet')
  @ApiBearerAuth()
  public async handle(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.findPetByID.execute({
      id,
    });

    if (result.isLeft()) {
      const error = result.value;

      throw new NotFoundException(error.message);
    }

    const pet = result.value.pet;

    return {
      pet: PetPresenter.toHTTP(pet),
    };
  }
}
