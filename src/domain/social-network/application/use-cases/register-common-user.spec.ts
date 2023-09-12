import { InMemoryCommonUsersRepository } from '@Testing/repositories/in-memory-common-users-repository';
import { RegisterCommonUserUseCase } from './register-common-user';
import { FakeHasher } from '@Testing/cryptography/fake-hasher';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { InvalidCpfException } from '@Domain/social-network/enterprise/entities/exceptions/invalid-cpf';
import { CommonUserAlreadyExistsException } from './exceptions/common-user-already-exists';

let inMemoryCommonUsersRepository: InMemoryCommonUsersRepository;
let fakeHasher: FakeHasher;
let systemUnderTest: RegisterCommonUserUseCase;

describe('Register Common User Use Case Test Suite', () => {
  beforeEach(() => {
    inMemoryCommonUsersRepository = new InMemoryCommonUsersRepository();
    fakeHasher = new FakeHasher();

    systemUnderTest = new RegisterCommonUserUseCase(
      inMemoryCommonUsersRepository,
      fakeHasher,
    );
  });

  it('should sucessfuly create a new Common User', async () => {
    const data = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      cpf: '000.000.000-00',
    };

    const result = await systemUnderTest.execute(data);

    expect(result.isRight()).toBe(true);
    expect(inMemoryCommonUsersRepository.items).toHaveLength(1);
  });

  it('should sucessfuly create a new Common User with a hashed password', async () => {
    const data = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      cpf: '000.000.000-00',
    };

    await systemUnderTest.execute(data);

    expect(inMemoryCommonUsersRepository.items).toHaveLength(1);
    expect(inMemoryCommonUsersRepository.items[0].password).toEqual(
      data.password.concat('-hashed'),
    );
    await expect(
      fakeHasher.compare(
        data.password,
        inMemoryCommonUsersRepository.items[0].password,
      ),
    ).resolves.toBe(true);
  });

  it('should not create a Common User with invalid CPF', async () => {
    const data = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      cpf: '000_00223120.00-00',
    };

    const result = await systemUnderTest.execute(data);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidCpfException);
  });

  it('should not create a Common User with duplicated CPF', async () => {
    const data = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      cpf: '000.000.000-00',
    };

    await systemUnderTest.execute(data);
    const result = await systemUnderTest.execute(data);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(CommonUserAlreadyExistsException);
  });

  it('should not create a Common User with duplicated email', async () => {
    const data = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      cpf: '000.000.000-00',
    };

    await systemUnderTest.execute(data);
    const result = await systemUnderTest.execute(data);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(CommonUserAlreadyExistsException);
  });

  it('should not create a Common User with duplicated username', async () => {
    const data = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      cpf: '000.000.000-00',
    };

    await systemUnderTest.execute(data);
    const result = await systemUnderTest.execute(data);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(CommonUserAlreadyExistsException);
  });
});
