import { FakeEncrypter } from '@Testing/cryptography/fake-encrypter';
import { FakeHasher } from '@Testing/cryptography/fake-hasher';
import { makeCommonUser } from '@Testing/factories/common-user-factory';
import { InMemoryCommonUsersRepository } from '@Testing/repositories/in-memory-common-users-repository';
import { AuthenticateCommonUserUseCase } from './authenticate-common-user';

let inMemoryCommonUsersRepository: InMemoryCommonUsersRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let systemUnderTest: AuthenticateCommonUserUseCase;

describe('Authenticate Common User Use Case Test Suite', () => {
  beforeEach(() => {
    inMemoryCommonUsersRepository = new InMemoryCommonUsersRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();

    systemUnderTest = new AuthenticateCommonUserUseCase(
      inMemoryCommonUsersRepository,
      fakeHasher,
      fakeEncrypter,
    );
  });

  it('should be able to authenticate a common user', async () => {
    const commonUser = makeCommonUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    await inMemoryCommonUsersRepository.create(commonUser);

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
});
