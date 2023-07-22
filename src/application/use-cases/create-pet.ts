import { Injectable } from '@nestjs/common';

import { Pet } from '@Domain/enterprise/entities/pet';
import { PetSize } from '@Domain/enterprise/entities/enums/pet-size';
import { PetEnergyLevel } from '@Domain/enterprise/entities/enums/pet-energy-level';
import { AdoptionRequirement } from '@Domain/enterprise/entities/adoption-requirement';
import { PetsRepository } from '@Application/repositories/pets-repository';
import { OrganizationsRepository } from '@Application/repositories/organizations-repository';
import { ResourceNotFoundException } from '@Application/exceptions/resource-not-found';
import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';

interface CreatePetUseCaseRequest {
  organizationId: string;
  name: string;
  bio: string;
  age: number;
  profilePictureUrl: string;
  isCastrated: boolean;
  requireMedicalAttention: boolean;
  isVaccinated: boolean;
  size: PetSize;
  energyLevel: PetEnergyLevel;
  adoptionRequirements?: AdoptionRequirement[];
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

@Injectable()
export class CreatePetUseCase {
  public constructor(
    private readonly organizationsRepository: OrganizationsRepository,
    private readonly petsRepository: PetsRepository,
  ) {}

  public async execute(
    request: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(
      request.organizationId,
    );

    if (!organization) {
      throw new ResourceNotFoundException(
        `Organização com ID ${request.organizationId} não encontrada.`,
      );
    }

    const pet = Pet.create({
      ...request,
      organizationId: new UniqueEntityId(request.organizationId),
    });

    await this.petsRepository.create(pet);

    return {
      pet,
    };
  }
}
