import { InvalidCnpjException } from '@Domain/social-network/enterprise/entities/exceptions/invalid-cnpj';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { FakeHasher } from '@Testing/cryptography/fake-hasher';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';

import { OrganizationAlreadyExistsException } from './exceptions/organization-already-exists-exception';
import {
  RegisterOrganizationUseCase,
  RegisterOrganizationUseCaseRequest,
} from './register-organization';

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let fakeHasher: FakeHasher;
let systemUnderTest: RegisterOrganizationUseCase;

describe('Register Organization Use Case Test Suite', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    fakeHasher = new FakeHasher();

    systemUnderTest = new RegisterOrganizationUseCase(
      inMemoryOrganizationsRepository,
      fakeHasher,
    );
  });

  it('should sucessfuly create a new Organization', async () => {
    const data: RegisterOrganizationUseCaseRequest = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      title: faker.company.name(),
      representativeName: faker.person.fullName(),
      cnpj: '99.999.999/9999-99',
      whatsapp: faker.phone.number(),
      address: faker.location.street(),
      cep: faker.location.zipCode('#####-###'),
      city: 'RG',
      state: 'RS',
    };

    const result = await systemUnderTest.execute(data);

    expect(result.isRight()).toBe(true);
    expect(inMemoryOrganizationsRepository.items).toHaveLength(1);
  });

  it('should sucessfuly create a new Organization with a hashed password', async () => {
    const data: RegisterOrganizationUseCaseRequest = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      title: faker.company.name(),
      representativeName: faker.person.fullName(),
      cnpj: '99.999.999/9999-99',
      whatsapp: faker.phone.number(),
      address: faker.location.street(),
      cep: faker.location.zipCode('#####-###'),
      city: 'RG',
      state: 'RS',
    };

    await systemUnderTest.execute(data);

    expect(inMemoryOrganizationsRepository.items).toHaveLength(1);
    expect(inMemoryOrganizationsRepository.items[0].password).toEqual(
      data.password.concat('-hashed'),
    );
    await expect(
      fakeHasher.compare(
        data.password,
        inMemoryOrganizationsRepository.items[0].password,
      ),
    ).resolves.toBe(true);
  });

  it('should not create an Organization with invalid CNPJ', async () => {
    const data: RegisterOrganizationUseCaseRequest = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      title: faker.company.name(),
      representativeName: faker.person.fullName(),
      cnpj: '99____2132431999..2999/999229-99',
      whatsapp: faker.phone.number(),
      address: faker.location.street(),
      cep: faker.location.zipCode('#####-###'),
      city: 'RG',
      state: 'RS',
    };

    const result = await systemUnderTest.execute(data);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidCnpjException);
  });

  it('should not create an Organization with duplicated CNPJ', async () => {
    const data: RegisterOrganizationUseCaseRequest = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      title: faker.company.name(),
      representativeName: faker.person.fullName(),
      cnpj: '99.999.999/9999-99',
      whatsapp: faker.phone.number(),
      address: faker.location.street(),
      cep: faker.location.zipCode('#####-###'),
      city: 'RG',
      state: 'RS',
    };

    await systemUnderTest.execute(data);
    const result = await systemUnderTest.execute(data);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrganizationAlreadyExistsException);
  });

  it('should not create an Organization with duplicated email', async () => {
    const data: RegisterOrganizationUseCaseRequest = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      title: faker.company.name(),
      representativeName: faker.person.fullName(),
      cnpj: '99.999.999/9999-99',
      whatsapp: faker.phone.number(),
      address: faker.location.street(),
      cep: faker.location.zipCode('#####-###'),
      city: 'RG',
      state: 'RS',
    };

    await systemUnderTest.execute(data);
    const result = await systemUnderTest.execute(data);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrganizationAlreadyExistsException);
  });

  it('should not create an Organization with duplicated username', async () => {
    const data: RegisterOrganizationUseCaseRequest = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      title: faker.company.name(),
      representativeName: faker.person.fullName(),
      cnpj: '99.999.999/9999-99',
      whatsapp: faker.phone.number(),
      address: faker.location.street(),
      cep: faker.location.zipCode('#####-###'),
      city: 'RG',
      state: 'RS',
    };

    await systemUnderTest.execute(data);
    const result = await systemUnderTest.execute(data);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrganizationAlreadyExistsException);
  });
});
