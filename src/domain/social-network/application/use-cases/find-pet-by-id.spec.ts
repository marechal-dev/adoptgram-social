import { makePet } from '@Testing/factories/pet-factory';
import { InMemoryPetsRepository } from '@Testing/repositories/in-memory-pets-repository';
import { PetNotFoundException } from './exceptions/pet-not-found-exception';
import { FindPetByIdUseCase } from './find-pet-by-id';

let inMemoryPetsRepository: InMemoryPetsRepository;
let systemUnderTest: FindPetByIdUseCase;

describe('Find Pet By ID Test Suite', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    systemUnderTest = new FindPetByIdUseCase(inMemoryPetsRepository);
  });

  it("should be able to fetch an existent Pet by it's ID", async () => {
    const pet = makePet({
      name: 'Bolt',
    });

    await inMemoryPetsRepository.create(pet);

    const result = await systemUnderTest.execute({
      id: pet.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.pet.name).toEqual('Bolt');
    }
  });

  it('should not be able to fetch an inexistent Pet', async () => {
    const result = await systemUnderTest.execute({
      id: 'fake-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(PetNotFoundException);
  });
});
