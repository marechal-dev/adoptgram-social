import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Pet, PetProps } from '@Domain/social-network/enterprise/entities/pet';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaPetMapper } from '@Infra/database/prisma/mappers/prisma-pet-mapper';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function makePet(override: Partial<PetProps> = {}, id?: UniqueEntityID) {
  const pet = Pet.create(
    {
      name: faker.person.firstName(),
      age: faker.number.int({
        min: 1,
        max: 20,
      }),
      bio: faker.lorem.paragraph(),
      energyLevel: 'Low',
      isCastrated: true,
      isVaccinated: true,
      requireMedicalAttention: true,
      size: 'Small',
      ownerOrganizationID: override.ownerOrganizationID ?? new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return pet;
}

@Injectable()
export class PrismaPetFactory {
  public constructor(private readonly prisma: PrismaService) {}

  public async make(data: Partial<PetProps> = {}) {
    const pet = makePet(data);

    await this.prisma.pet.create({
      data: PrismaPetMapper.toPrisma(pet),
    });

    return pet;
  }
}
