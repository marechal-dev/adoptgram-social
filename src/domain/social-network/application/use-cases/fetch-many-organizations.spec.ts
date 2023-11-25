import { makeOrganization } from '@Testing/factories/organization-factory';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';

import { FetchManyOrganizationsUseCase } from './fetch-many-organizations';

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let systemUnderTest: FetchManyOrganizationsUseCase;

describe('Fetch Many Organization Test Suite', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    systemUnderTest = new FetchManyOrganizationsUseCase(
      inMemoryOrganizationsRepository,
    );
  });

  it('should retrieve a Paged List of Organizations', async () => {
    for (let i = 0; i < 25; i++) {
      const organization = makeOrganization();

      await inMemoryOrganizationsRepository.create(organization);
    }

    const result = await systemUnderTest.execute({
      page: 1,
      pageSize: 20,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.pagedList.hasNextPage).toBe(true);
  });
});
