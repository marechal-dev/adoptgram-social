import { makeCommonUser } from '@Testing/factories/common-user-factory';
import { InMemoryCommonUsersRepository } from '@Testing/repositories/in-memory-common-users-repository';
import { expect } from 'vitest';

import { DeleteCommonUserUseCase } from './delete-common-user';
import { CommonUserNotFoundException } from './exceptions/common-user-not-found-exception';

let inMemoryCommonUsersRepository: InMemoryCommonUsersRepository;
let systemUnderTest: DeleteCommonUserUseCase;

describe('Delete Common User Test Suite', () => {
  beforeEach(() => {
    inMemoryCommonUsersRepository = new InMemoryCommonUsersRepository();
    systemUnderTest = new DeleteCommonUserUseCase(
      inMemoryCommonUsersRepository,
    );
  });

  it("should be able to delete an existent Common User by it's ID", async () => {
    const commonUser = makeCommonUser({
      name: 'John Doe',
    });

    await inMemoryCommonUsersRepository.create(commonUser);

    const result = await systemUnderTest.execute({
      commonUserID: commonUser.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value).toBeNull();
    }
  });

  it('should not be able to delete an inexistent Common User', async () => {
    const result = await systemUnderTest.execute({
      commonUserID: 'fake-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(CommonUserNotFoundException);
  });
});
