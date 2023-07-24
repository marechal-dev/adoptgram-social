/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fakerPT_BR as faker } from '@faker-js/faker';

import { hash } from 'bcrypt';

import { AuthenticateUserUseCase } from './authenticate-user';
import { InMemoryCommonUsersRepository } from '@Testing/repositories/in-memory-common-users-repository';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { CommonUser } from '@Domain/enterprise/entities/common-user';
import { Cpf } from '@Domain/enterprise/entities/value-objects/cpf';
import { Organization } from '@Domain/enterprise/entities/organization';
import { Address } from '@Domain/enterprise/entities/value-objects/address';
import { UserRoleNotAllowedException } from '@Application/exceptions/user-role-not-allowed';
import { IncorrectEmailOrPasswordException } from '@Application/exceptions/incorrect-email-or-password';

let inMemoryCommonUsersRepository: InMemoryCommonUsersRepository;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let systemUnderTest: AuthenticateUserUseCase;

describe('Authenticate User Use Case Test Suite', () => {
  beforeEach(() => {
    inMemoryCommonUsersRepository = new InMemoryCommonUsersRepository();
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    systemUnderTest = new AuthenticateUserUseCase(
      inMemoryCommonUsersRepository,
      inMemoryOrganizationsRepository,
    );
  });

  it('should authenticate a Common User', async () => {
    const password = faker.internet.password({
      length: 12,
    });

    const passwordHash = await hash(password, 6);

    const commonUser = CommonUser.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      passwordHash,
      firstName: faker.person.firstName(),
      surname: faker.person.lastName(),
      cpf: Cpf.createFromText('000.000.000-00'),
    });

    await inMemoryCommonUsersRepository.create(commonUser);

    const { user } = await systemUnderTest.execute({
      email: commonUser.email,
      password,
      kind: 'CommonUser',
    });

    expect(user).toBeTruthy();
    expect(user.id).toEqual(expect.any(String));
  });

  it('should not authenticate a Common User with invalid email', async () => {
    const password = faker.internet.password({
      length: 12,
    });

    const passwordHash = await hash(password, 6);

    const commonUser = CommonUser.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      passwordHash,
      firstName: faker.person.firstName(),
      surname: faker.person.lastName(),
      cpf: Cpf.createFromText('000.000.000-00'),
    });

    await inMemoryCommonUsersRepository.create(commonUser);

    await expect(() =>
      systemUnderTest.execute({
        email: 'email@gmail.com',
        password,
        kind: 'CommonUser',
      }),
    ).rejects.toThrow(IncorrectEmailOrPasswordException);
  });

  it('should authenticate an Organization', async () => {
    const password = faker.internet.password({
      length: 12,
    });

    const passwordHash = await hash(password, 6);

    const organization = Organization.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      passwordHash,
      title: faker.company.name(),
      representativeName: faker.person.fullName(),
      whatsapp: faker.phone.number(),
      address: Address.create({
        firstLine: faker.location.street(),
        number: faker.location.buildingNumber(),
        cep: faker.location.zipCode('#####-###'),
        neighborhood: faker.location.county(),
        city: faker.location.city(),
        state: faker.location.state(),
      }),
    });

    await inMemoryOrganizationsRepository.create(organization);

    await expect(() =>
      systemUnderTest.execute({
        email: 'email@gmail.com',
        password,
        kind: 'Organization',
      }),
    ).rejects.toThrow(IncorrectEmailOrPasswordException);
  });

  it('should not authenticate an User with invalid kind', async () => {
    await expect(() =>
      systemUnderTest.execute({
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 12,
        }),
        //@ts-ignore
        kind: 'Unknown',
      }),
    ).rejects.toThrow(UserRoleNotAllowedException);
  });
});
