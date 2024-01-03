import { makeOrganization } from '@Testing/factories/organization-factory';
import { InMemoryFollowsRepository } from '@Testing/repositories/in-memory-follows-repository';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@Testing/repositories/in-memory-pets-repository';
import { InMemoryPostsRepository } from '@Testing/repositories/in-memory-posts-repository';

import { FindOrganizationByIdUseCase } from './find-organization-by-id';

let inMemoryFollowsRepository: InMemoryFollowsRepository;
let inMemoryPostsRepository: InMemoryPostsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let systemUnderTest: FindOrganizationByIdUseCase;

describe('Find Organization By ID Test Suite', () => {
  beforeEach(() => {
    inMemoryFollowsRepository = new InMemoryFollowsRepository();
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository(
      inMemoryFollowsRepository,
      inMemoryPostsRepository,
      inMemoryPetsRepository,
    );
    systemUnderTest = new FindOrganizationByIdUseCase(
      inMemoryOrganizationsRepository,
    );
  });

  it("should be able to fetch an existent organization by it's ID", async () => {
    const organization = makeOrganization({
      title: 'Lambeijos de Luz',
    });

    await inMemoryOrganizationsRepository.create(organization);

    const result = await systemUnderTest.execute({
      organizationID: organization.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.organization.title).toEqual('Lambeijos de Luz');
    }
  });
});
