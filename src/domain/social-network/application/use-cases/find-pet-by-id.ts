import { Either, left, right } from '@Core/types/either';
import { Pet } from '@Domain/social-network/enterprise/entities/pet';
import { Injectable } from '@nestjs/common';
import { PetsRepository } from '../repositories/pets-repository';
import { PetNotFoundException } from './exceptions/pet-not-found-exception';

interface FindPetByIdUseCaseRequest {
  id: string;
}

type FindPetByIdUseCaseResponse = Either<
  PetNotFoundException,
  {
    pet: Pet;
  }
>;

@Injectable()
export class FindPetByIdUseCase {
  public constructor(private readonly petsRepository: PetsRepository) {}

  public async execute({
    id,
  }: FindPetByIdUseCaseRequest): Promise<FindPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      return left(new PetNotFoundException(id));
    }

    return right({
      pet,
    });
  }
}
