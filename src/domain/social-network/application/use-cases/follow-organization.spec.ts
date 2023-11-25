import { FakeEncrypter } from '@Testing/cryptography/fake-encrypter';
import { FakeHasher } from '@Testing/cryptography/fake-hasher';
import { makeCommonUser } from '@Testing/factories/common-user-factory';
import { makeFollow } from '@Testing/factories/follow-factory';
import { makeOrganization } from '@Testing/factories/organization-factory';
import { InMemoryFollowsRepository } from '@Testing/repositories/in-memory-follows-repository';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { expect } from 'vitest';

import { AlreadyFollowingOrganizationException } from './exceptions/already-following-organization-exception';
import { OrganizationNotFoundException } from './exceptions/organization-not-found-exception';
import { FollowOrganizationUseCase } from './follow-organization';

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let inMemoryFollowsRepository: InMemoryFollowsRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let systemUnderTest: FollowOrganizationUseCase;

describe('Follow Organization Use Case Test Suite', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    inMemoryFollowsRepository = new InMemoryFollowsRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();

    systemUnderTest = new FollowOrganizationUseCase(
      inMemoryOrganizationsRepository,
      inMemoryFollowsRepository,
    );
  });

  it('should be able to follow an organization', async () => {
    const commonUser = makeCommonUser();
    const organization = makeOrganization();

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

  it('should not be able to follow an inexistent organization', async () => {
    const commonUser = makeCommonUser();
    const organization = makeOrganization();

    const result = await systemUnderTest.execute({
      commonUserID: commonUser.id.toString(),
      organizationID: organization.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrganizationNotFoundException);
  });

  it('should not be able to follow an organization twice', async () => {
    const commonUser = makeCommonUser();
    const organization = makeOrganization();

    await inMemoryOrganizationsRepository.create(organization);

    const follow = makeFollow({
      commonUserID: commonUser.id,
      organizationID: organization.id,
    });

    await inMemoryFollowsRepository.create(follow);

    const result = await systemUnderTest.execute({
      commonUserID: commonUser.id.toString(),
      organizationID: organization.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AlreadyFollowingOrganizationException);
  });
});
