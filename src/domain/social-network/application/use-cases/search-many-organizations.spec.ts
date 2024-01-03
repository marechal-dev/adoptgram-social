import { makeOrganization } from '@Testing/factories/organization-factory';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';

import { SearchManyOrganizationsUseCase } from './search-many-organizations';

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let systemUnderTest: SearchManyOrganizationsUseCase;

describe('Search Many Organizations Test Suite', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    systemUnderTest = new SearchManyOrganizationsUseCase(
      inMemoryOrganizationsRepository,
    );
  });

  it('should retrieve a Paged List of Organizations', async () => {
    const organization1 = makeOrganization({
      title: 'Lambeijos de Luz',
    });
    const organization2 = makeOrganization({
      title: 'Lambidas de Amor',
    });

    await inMemoryOrganizationsRepository.create(organization1);
    await inMemoryOrganizationsRepository.create(organization2);

    for (let i = 0; i < 22; i++) {
      const organization = makeOrganization();

      await inMemoryOrganizationsRepository.create(organization);
    }

    const result = await systemUnderTest.execute({
      query: 'Lamb',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.queryResult).toHaveLength(2);
  });
});
