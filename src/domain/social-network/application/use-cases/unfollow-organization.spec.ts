import { FakeEncrypter } from '@Testing/cryptography/fake-encrypter';
import { FakeHasher } from '@Testing/cryptography/fake-hasher';
import { InMemoryCommonUsersRepository } from '@Testing/repositories/in-memory-common-users-repository';
import { CommonUserFactory } from '@Testing/factories/common-user-factory';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { InMemoryFollowsRepository } from '@Testing/repositories/in-memory-follows-repository';
import { OrganizationFactory } from '@Testing/factories/organization-factory';
import { UnfollowOrganizationUseCase } from './unfollow-organization';
import { FollowFactory } from '@Testing/factories/follow-factory';

let inMemoryCommonUsersRepository: InMemoryCommonUsersRepository;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let inMemoryFollowsRepository: InMemoryFollowsRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let systemUnderTest: UnfollowOrganizationUseCase;

describe('Unfollow Organization Use Case Test Suite', () => {
  beforeEach(() => {
    inMemoryCommonUsersRepository = new InMemoryCommonUsersRepository();
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    inMemoryFollowsRepository = new InMemoryFollowsRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();

    systemUnderTest = new UnfollowOrganizationUseCase(
      inMemoryCommonUsersRepository,
      inMemoryOrganizationsRepository,
      inMemoryFollowsRepository,
    );
  });

  it('should be able to unfollow an organization', async () => {
    const commonUser = CommonUserFactory.make();
    const organization = OrganizationFactory.make();

    await inMemoryCommonUsersRepository.create(commonUser);
    await inMemoryOrganizationsRepository.create(organization);

    const follow = FollowFactory.make({
      commonUserID: commonUser.id,
      organizationID: organization.id,
    });

    await inMemoryFollowsRepository.create(follow);

    const result = await systemUnderTest.execute({
      commonUserID: commonUser.id.toString(),
      organizationID: organization.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(null);
    expect(inMemoryFollowsRepository.items).toHaveLength(0);
  });
});
