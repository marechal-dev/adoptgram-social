import { makeOrganization } from '@Testing/factories/organization-factory';
import { makePet } from '@Testing/factories/pet-factory';
import { InMemoryCommentsRepository } from '@Testing/repositories/in-memory-comments-repository';
import { InMemoryCommonUsersRepository } from '@Testing/repositories/in-memory-common-users-repository';
import { InMemoryFollowsRepository } from '@Testing/repositories/in-memory-follows-repository';
import { InMemoryMediasRepository } from '@Testing/repositories/in-memory-medias-repository';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@Testing/repositories/in-memory-pets-repository';
import { InMemoryPostsRepository } from '@Testing/repositories/in-memory-posts-repository';

import { FetchManyPetsByOwnerOrganizationIdUseCase } from './fetch-many-pets-by-owner-organization-id';

let inMemoryFollowsRepository: InMemoryFollowsRepository;
let inMemoryMediasRepository: InMemoryMediasRepository;
let inMemoryCommonUsersRepository: InMemoryCommonUsersRepository;
let inMemoryCommentsRepository: InMemoryCommentsRepository;
let inMemoryPostsRepository: InMemoryPostsRepository;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let systemUnderTest: FetchManyPetsByOwnerOrganizationIdUseCase;

describe('Fetch Many Pets by Owner Organization ID Test Suite', () => {
  beforeEach(() => {
    inMemoryFollowsRepository = new InMemoryFollowsRepository();
    inMemoryMediasRepository = new InMemoryMediasRepository();
    inMemoryCommonUsersRepository = new InMemoryCommonUsersRepository();
    inMemoryCommentsRepository = new InMemoryCommentsRepository(
      inMemoryCommonUsersRepository,
    );
    inMemoryPostsRepository ==
      new InMemoryPostsRepository(
        inMemoryMediasRepository,
        inMemoryOrganizationsRepository,
        inMemoryCommentsRepository,
      );
    inMemoryPetsRepository = new InMemoryPetsRepository();
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository(
      inMemoryFollowsRepository,
      inMemoryPostsRepository,
      inMemoryPetsRepository,
    );

    inMemoryPostsRepository.inMemoryOrganizationsRepository =
      inMemoryOrganizationsRepository;

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
