import { fakerPT_BR as faker } from '@faker-js/faker';

import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@Testing/repositories/in-memory-pets-repository';
import { Organization } from '@Domain/enterprise/entities/organization';
import { Address } from '@Domain/enterprise/entities/value-objects/address';
import { PetSize } from '@Domain/enterprise/entities/enums/pet-size';
import { PetEnergyLevel } from '@Domain/enterprise/entities/enums/pet-energy-level';
import { ResourceNotFoundException } from '@Application/exceptions/resource-not-found';
import { CreatePetUseCase } from './create-pet';

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let systemUnderTest: CreatePetUseCase;

describe('Create Pet Use Case Test Suite', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository();
    systemUnderTest = new CreatePetUseCase(
      inMemoryOrganizationsRepository,
      inMemoryPetsRepository,
    );
  });

  it('should create a Pet', async () => {
    const orgData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      passwordHash: faker.internet.password({
        length: 12,
      }),
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
    };

    const org = await inMemoryOrganizationsRepository.create(
      Organization.create(orgData),
    );

    const petData = {
      organizationId: org.id.toString(),
      name: 'Bolt',
      bio: 'Um grande amigo brincalhão e branquinho',
      age: 8,
      profilePictureUrl: faker.internet.url(),
      isCastrated: false,
      requireMedicalAttention: false,
      isVaccinated: true,
      size: 'Small' as PetSize,
      energyLevel: 'Medium' as PetEnergyLevel,
    };

    const { pet } = await systemUnderTest.execute(petData);

    expect(pet).toBeTruthy();
    expect(pet.id.toString()).toEqual(expect.any(String));
    expect(inMemoryPetsRepository.items[0].id.toString()).toEqual(
      pet.id.toString(),
    );
  });

  it('should not create a Pet for an inexistant Organization', async () => {
    const petData = {
      organizationId: 'org-1',
      name: 'Bolt',
      bio: 'Um grande amigo brincalhão e branquinho',
      age: 8,
      profilePictureUrl: faker.internet.url(),
      isCastrated: false,
      requireMedicalAttention: false,
      isVaccinated: true,
      size: 'Small' as PetSize,
      energyLevel: 'Medium' as PetEnergyLevel,
    };

    await expect(() => systemUnderTest.execute(petData)).rejects.toThrow(
      ResourceNotFoundException,
    );
  });
});
