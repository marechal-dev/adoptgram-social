import { makeCommonUser } from '@Testing/factories/common-user-factory';
import { InMemoryCommonUsersRepository } from '@Testing/repositories/in-memory-common-users-repository';

import { FetchManyCommonUsersUseCase } from './fetch-many-common-users';

let inMemoryCommonUsersRepository: InMemoryCommonUsersRepository;
let systemUnderTest: FetchManyCommonUsersUseCase;

describe('Fetch Many Common Users Test Suite', () => {
  beforeEach(() => {
    inMemoryCommonUsersRepository = new InMemoryCommonUsersRepository();
    systemUnderTest = new FetchManyCommonUsersUseCase(
      inMemoryCommonUsersRepository,
    );
  });

  it('should retrieve a Paged List of Common Users', async () => {
    for (let i = 0; i < 25; i++) {
      const user = makeCommonUser();

      await inMemoryCommonUsersRepository.create(user);
    }

    const result = await systemUnderTest.execute({
      page: 1,
      pageSize: 20,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.pagedList.hasNextPage).toBe(true);
  });
});
