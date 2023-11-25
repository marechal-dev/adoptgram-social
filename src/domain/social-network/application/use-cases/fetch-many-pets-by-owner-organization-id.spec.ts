import { makeOrganization } from '@Testing/factories/organization-factory';
import { makePet } from '@Testing/factories/pet-factory';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@Testing/repositories/in-memory-pets-repository';

import { FetchManyPetsByOwnerOrganizationIdUseCase } from './fetch-many-pets-by-owner-organization-id';

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let systemUnderTest: FetchManyPetsByOwnerOrganizationIdUseCase;

describe('Fetch Many Pets by Owner Organization ID Test Suite', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository();
    systemUnderTest = new FetchManyPetsByOwnerOrganizationIdUseCase(
      inMemoryPetsRepository,
    );
  });

  it("should be able to fetch Pets from an existent organization by it's ID", async () => {
    const organization = makeOrganization({
      title: 'Lambeijos de Luz',
    });

    await inMemoryOrganizationsRepository.create(organization);

    const pet1 = makePet({
      name: 'Bolt',
      ownerOrganizationID: organization.id,
    });

    const pet2 = makePet({
      name: 'Bolinha',
      ownerOrganizationID: organization.id,
    });

    await inMemoryPetsRepository.create(pet1);
    await inMemoryPetsRepository.create(pet2);

    const result = await systemUnderTest.execute({
      ownerOrganizationID: organization.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.pets).toHaveLength(2);
      expect(result.value.pets).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Bolt',
          }),
          expect.objectContaining({
            name: 'Bolinha',
          }),
        ]),
      );
    }
  });
});
