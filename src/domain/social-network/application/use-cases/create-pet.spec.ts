import { makeOrganization } from '@Testing/factories/organization-factory';
import { InMemoryPetsRepository } from '@Testing/repositories/in-memory-pets-repository';

import { CreatePetUseCase } from './create-pet';

let inMemoryPetsRepository: InMemoryPetsRepository;
let systemUnderTest: CreatePetUseCase;

describe('Create Pet Test Suite', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    systemUnderTest = new CreatePetUseCase(inMemoryPetsRepository);
  });

  it('should be able to create a new Pet', async () => {
    const organization = makeOrganization({
      title: 'Lambeijos de Luz',
    });

    const result = await systemUnderTest.execute({
      name: 'Bolt',
      age: 7,
      bio: 'Sou fofinho, branquinho e peludo, seu melhor amigo :)',
      energyLevel: 'Medium',
      isCastrated: false,
      isVaccinated: true,
      requireMedicalAttention: false,
      size: 'Medium',
      ownerOrganizationID: organization.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.pet?.name).toEqual('Bolt');
    expect(inMemoryPetsRepository.items).toHaveLength(1);
  });
});
