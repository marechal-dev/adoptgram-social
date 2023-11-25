import { Either, right } from '@Core/types/either';
import { Pet } from '@Domain/social-network/enterprise/entities/pet';
import { Injectable } from '@nestjs/common';

import { PetsRepository } from '../repositories/pets-repository';

interface FetchManyPetsByOwnerOrganizationIdUseCaseRequest {
  ownerOrganizationID: string;
}

type FetchManyPetsByOwnerOrganizationIdUseCaseResponse = Either<
  null,
  {
    pets: Pet[];
  }
>;

@Injectable()
export class FetchManyPetsByOwnerOrganizationIdUseCase {
  public constructor(private readonly petsRepository: PetsRepository) {}

  public async execute({
    ownerOrganizationID,
  }: FetchManyPetsByOwnerOrganizationIdUseCaseRequest): Promise<FetchManyPetsByOwnerOrganizationIdUseCaseResponse> {
    const pets =
      await this.petsRepository.fetchManyByOwnerOrganizationID(
        ownerOrganizationID,
      );

    return right({
      pets,
    });
  }
}
