import { FakeEncrypter } from '@Testing/cryptography/fake-encrypter';
import { FakeHasher } from '@Testing/cryptography/fake-hasher';
import { makeAdministrator } from '@Testing/factories/administrator-factory';
import { InMemoryAdministratorsRepository } from '@Testing/repositories/in-memory-administrators-repository';

import { AuthenticateAdministratorUseCase } from './authenticate-administrator';
import { IncorrectCredentialsException } from './exceptions/incorrect-credentials-exception';

let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let systemUnderTest: AuthenticateAdministratorUseCase;

describe('Authenticate Administrator Use Case Test', () => {
  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();

    systemUnderTest = new AuthenticateAdministratorUseCase(
      inMemoryAdministratorsRepository,
      fakeHasher,
      fakeEncrypter,
    );
  });

  it('should be able to authenticate an Admin', async () => {
    const administrator = makeAdministrator({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryAdministratorsRepository.items.push(administrator);

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

  it('should not be able to authenticate an inexistent Admin', async () => {
    const result = await systemUnderTest.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(IncorrectCredentialsException);
  });

  it('should not be able to authenticate an Admin with incorrect credentials', async () => {
    const administrator = makeAdministrator({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryAdministratorsRepository.items.push(administrator);

    const result = await systemUnderTest.execute({
      email: 'johndoe@example.com',
      password: '12345678',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(IncorrectCredentialsException);
  });
});
