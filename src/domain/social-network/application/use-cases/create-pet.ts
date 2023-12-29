import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Either, right } from '@Core/types/either';
import { PetEnergyLevel } from '@Domain/social-network/enterprise/entities/enums/pet-energy-level';
import { PetSize } from '@Domain/social-network/enterprise/entities/enums/pet-size';
import { Pet } from '@Domain/social-network/enterprise/entities/pet';
import { Injectable } from '@nestjs/common';

import { PetsRepository } from '../repositories/pets-repository';

interface CreatePetUseCaseRequest {
  name: string;
  bio?: string;
  age: number;
  profilePictureURL: string;
  isCastrated: boolean;
  requireMedicalAttention: boolean;
  isVaccinated: boolean;
  size: PetSize;
  energyLevel: PetEnergyLevel;
  ownerOrganizationID: string;
}

type CreatePetUseCaseResponse = Either<
  null,
  {
    pet: Pet;
  }
>;

@Injectable()
export class CreatePetUseCase {
  public constructor(private readonly petsRepository: PetsRepository) {}

  public async execute(
    request: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const pet = Pet.create({
      name: request.name,
      bio: request.bio,
      age: request.age,
      profilePictureURL: request.profilePictureURL,
      isCastrated: request.isCastrated,
      requireMedicalAttention: request.requireMedicalAttention,
      isVaccinated: request.isVaccinated,
      size: request.size,
      energyLevel: request.energyLevel,
      ownerOrganizationID: new UniqueEntityID(request.ownerOrganizationID),
    });

    await this.petsRepository.create(pet);

    return right({
      pet,
    });
  }
}
