import { fakerPT_BR as faker } from '@faker-js/faker';

import { InMemoryCommonUsersRepository } from '@Testing/repositories/in-memory-common-users-repository';
import { CreateCommonUserUseCase } from './create-common-user';
import { ResourceAlreadyExistsException } from '@Application/exceptions/resource-already-exists';

let inMemoryCommonUsersRepository: InMemoryCommonUsersRepository;
let systemUnderTest: CreateCommonUserUseCase;

describe('Create Common User Use Case Test Suite', () => {
  beforeEach(() => {
    inMemoryCommonUsersRepository = new InMemoryCommonUsersRepository();
    systemUnderTest = new CreateCommonUserUseCase(
      inMemoryCommonUsersRepository,
    );
  });

  it('should create a Common User', async () => {
    const data = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 12,
      }),
      firstName: faker.person.firstName(),
      surname: faker.person.lastName(),
      cpf: '000.000.000-00',
    };

    const { profile } = await systemUnderTest.execute(data);

    expect(profile).toBeTruthy();
    expect(profile.id.toString()).toEqual(expect.any(String));
    expect(inMemoryCommonUsersRepository.items[0].cpf.toString()).toEqual(
      profile.cpf.toString(),
    );
  });

  it('should not create a duplicated Common User by username', async () => {
    const data = {
      username: 'john-doe',
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 12,
      }),
      firstName: faker.person.firstName(),
      surname: faker.person.lastName(),
      cpf: '000.000.000-00',
    };

    await systemUnderTest.execute(data);

    await expect(() => systemUnderTest.execute(data)).rejects.toThrow(
      ResourceAlreadyExistsException,
    );
  });

  it('should not create a duplicated Common User by e-mail', async () => {
    const data = {
      username: faker.internet.userName(),
      email: 'john-doe@gmail.com',
      password: faker.internet.password({
        length: 12,
      }),
      firstName: faker.person.firstName(),
      surname: faker.person.lastName(),
      cpf: '000.000.000-00',
    };

    await systemUnderTest.execute(data);

    await expect(() => systemUnderTest.execute(data)).rejects.toThrow(
      ResourceAlreadyExistsException,
    );
  });

  it('should not create a duplicated Common User by CPF', async () => {
    const data = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 12,
      }),
      firstName: faker.person.firstName(),
      surname: faker.person.lastName(),
      cpf: '000.000.000-00',
    };

    await systemUnderTest.execute(data);

    await expect(() => systemUnderTest.execute(data)).rejects.toThrow(
      ResourceAlreadyExistsException,
    );
  });
});
