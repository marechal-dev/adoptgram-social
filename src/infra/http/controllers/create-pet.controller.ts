import { CreatePetUseCase } from '@Domain/social-network/application/use-cases/create-pet';
import { CurrentUser } from '@Infra/auth/decorators/current-user.decorator';
import { UserPayload } from '@Infra/auth/jwt-auth.guard';
import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { CreatePetDTO } from '../dtos/create-pet.dto';
import { RolesGuard } from '../guards/roles.guard';
import { PetPresenter } from '../presenters/pet-presenter';

@Controller('/pets')
@UsePipes(ZodValidationPipe)
export class CreatePetController {
  public constructor(private readonly createPet: CreatePetUseCase) {}

  @Post()
  @AllowedRoles('Admin', 'Organization')
  @UseGuards(RolesGuard)
  @ApiTags('Pet')
  @ApiBearerAuth()
  public async handle(
    @Body() requestBody: CreatePetDTO,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const result = await this.createPet.execute({
      name: requestBody.name,
      age: requestBody.age,
      bio: requestBody.bio,
      energyLevel: requestBody.energyLevel,
      isCastrated: requestBody.isCastrated,
      isVaccinated: requestBody.isVaccinated,
      requireMedicalAttention: requestBody.requireMedicalAttention,
      size: requestBody.size,
      ownerOrganizationID: currentUser.sub,
    });

    if (result.isRight()) {
      return PetPresenter.toHTTP(result.value.pet);
    }
  }
}
