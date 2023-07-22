import { fakerPT_BR as faker } from '@faker-js/faker';

import { ResourceAlreadyExistsException } from '@Application/exceptions/resource-already-exists';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { CreateOrganizationUseCase } from './create-organization';

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let systemUnderTest: CreateOrganizationUseCase;

describe('Create Organization Use Case Test Suite', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    systemUnderTest = new CreateOrganizationUseCase(
      inMemoryOrganizationsRepository,
    );
  });

  it('should create a Organization', async () => {
    const data = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 12,
      }),
      title: faker.company.name(),
      representativeName: faker.person.fullName(),
      whatsapp: faker.phone.number(),
      address: {
        firstLine: faker.location.street(),
        number: faker.location.buildingNumber(),
        cep: faker.location.zipCode('#####-###'),
        neighborhood: faker.location.county(),
        city: faker.location.city(),
        state: faker.location.state(),
      },
    };

    const { profile } = await systemUnderTest.execute(data);

    expect(profile).toBeTruthy();
    expect(profile.id.toString()).toEqual(expect.any(String));
    expect(
      inMemoryOrganizationsRepository.items[0].address.toValue().cep,
    ).toEqual(profile.address.toValue().cep);
  });

  it('should not create a duplicated Organization by username', async () => {
    const data = {
      username: 'pet-mania-ngo',
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 12,
      }),
      title: faker.company.name(),
      representativeName: faker.person.fullName(),
      whatsapp: faker.phone.number(),
      address: {
        firstLine: faker.location.street(),
        number: faker.location.buildingNumber(),
        cep: faker.location.zipCode('#####-###'),
        neighborhood: faker.location.county(),
        city: faker.location.city(),
        state: faker.location.state(),
      },
    };

    await systemUnderTest.execute(data);

    await expect(() => systemUnderTest.execute(data)).rejects.toThrow(
      ResourceAlreadyExistsException,
    );
  });

  it('should not create a duplicated Organization by e-mail', async () => {
    const data = {
      username: faker.internet.userName(),
      email: 'john-doe@gmail.com',
      password: faker.internet.password({
        length: 12,
      }),
      title: faker.company.name(),
      representativeName: faker.person.fullName(),
      whatsapp: faker.phone.number(),
      address: {
        firstLine: faker.location.street(),
        number: faker.location.buildingNumber(),
        cep: faker.location.zipCode('#####-###'),
        neighborhood: faker.location.county(),
        city: faker.location.city(),
        state: faker.location.state(),
      },
    };

    await systemUnderTest.execute(data);

    await expect(() => systemUnderTest.execute(data)).rejects.toThrow(
      ResourceAlreadyExistsException,
    );
  });
});
