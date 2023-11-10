import { makePet } from '@Testing/factories/pet-factory';
import { InMemoryPetsRepository } from '@Testing/repositories/in-memory-pets-repository';
import { expect } from 'vitest';
import { DeletePetUseCase } from './delete-pet';
import { PetNotFoundException } from './exceptions/pet-not-found-exception';

let inMemoryPetsRepository: InMemoryPetsRepository;
let systemUnderTest: DeletePetUseCase;

describe('Find Pet By ID Test Suite', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    systemUnderTest = new DeletePetUseCase(inMemoryPetsRepository);
  });

  it("should be able to delete an existent Pet by it's ID", async () => {
    const pet = makePet({
      name: 'Bolt',
    });

    await inMemoryPetsRepository.create(pet);

    const result = await systemUnderTest.execute({
      id: pet.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value).toBeNull();
    }
  });

  it('should not be able to delete an inexistent Pet', async () => {
    const result = await systemUnderTest.execute({
      id: 'fake-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(PetNotFoundException);
  });
});
