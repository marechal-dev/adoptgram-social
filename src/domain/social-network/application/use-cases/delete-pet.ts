import { Either, left, right } from '@Core/types/either';
import { Injectable } from '@nestjs/common';

import { PetsRepository } from '../repositories/pets-repository';

import { PetNotFoundException } from './exceptions/pet-not-found-exception';

interface DeletePetUseCaseRequest {
  id: string;
}

type DeletePetUseCaseResponse = Either<PetNotFoundException, null>;

@Injectable()
export class DeletePetUseCase {
  public constructor(private readonly petsRepository: PetsRepository) {}

  public async execute({
    id,
  }: DeletePetUseCaseRequest): Promise<DeletePetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      return left(new PetNotFoundException(id));
    }

    await this.petsRepository.delete(id);

    return right(null);
  }
}
