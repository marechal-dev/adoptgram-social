import { FakeEncrypter } from '@Testing/cryptography/fake-encrypter';
import { FakeHasher } from '@Testing/cryptography/fake-hasher';
import { InMemoryCommonUsersRepository } from '@Testing/repositories/in-memory-common-users-repository';
import { AuthenticateCommonUserUseCase } from './authenticate-common-user';
import { CommonUserFactory } from '@Testing/factories/common-user-factory';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { FollowOrganizationUseCase } from './follow-organization';
import { InMemoryFollowsRepository } from '@Testing/repositories/in-memory-follows-repository';
import { OrganizationFactory } from '@Testing/factories/organization-factory';

let inMemoryCommonUsersRepository: InMemoryCommonUsersRepository;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let inMemoryFollowsRepository: InMemoryFollowsRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let systemUnderTest: FollowOrganizationUseCase;

describe('Follow Organization Use Case Test Suite', () => {
  beforeEach(() => {
    inMemoryCommonUsersRepository = new InMemoryCommonUsersRepository();
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    inMemoryFollowsRepository = new InMemoryFollowsRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();

    systemUnderTest = new FollowOrganizationUseCase(
      inMemoryCommonUsersRepository,
      inMemoryOrganizationsRepository,
      inMemoryFollowsRepository,
    );
  });

  it('should be able to follow an organization', async () => {
    const commonUser = CommonUserFactory.make();
    const organization = OrganizationFactory.make();

    await inMemoryCommonUsersRepository.create(commonUser);
    await inMemoryOrganizationsRepository.create(organization);

    const result = await systemUnderTest.execute({
      commonUserID: commonUser.id.toString(),
      organizationID: organization.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(null);
    expect(
      inMemoryFollowsRepository.items[0].organizationID.toString(),
    ).toEqual(organization.id.toString());
  });
});
