import { FakeEncrypter } from '@Testing/cryptography/fake-encrypter';
import { FakeHasher } from '@Testing/cryptography/fake-hasher';
import { makeOrganization } from '@Testing/factories/organization-factory';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';

import { AuthenticateOrganizationUseCase } from './authenticate-organization';
import { IncorrectCredentialsException } from './exceptions/incorrect-credentials-exception';

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let systemUnderTest: AuthenticateOrganizationUseCase;

describe('Authenticate Organization Use Case Test Suite', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();

    systemUnderTest = new AuthenticateOrganizationUseCase(
      inMemoryOrganizationsRepository,
      fakeHasher,
      fakeEncrypter,
    );
  });

  it('should be able to authenticate an Organization', async () => {
    const organization = makeOrganization({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    await inMemoryOrganizationsRepository.create(organization);

    const result = await systemUnderTest.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
      userID: expect.any(String),
    });
  });

  it('should not be able to authenticate an Organization with incorrect credentials', async () => {
    const organization = makeOrganization({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    await inMemoryOrganizationsRepository.create(organization);

    const result = await systemUnderTest.execute({
      email: 'johndoe@example.com',
      password: '1234568678',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(IncorrectCredentialsException);
  });

  it('should not be able to authenticate an inexistent Organization', async () => {
    const result = await systemUnderTest.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(IncorrectCredentialsException);
  });
});
