import { PetsRepository } from '@Domain/social-network/application/repositories/pets-repository';
import { Pet } from '@Domain/social-network/enterprise/entities/pet';
import { Injectable } from '@nestjs/common';

import { PrismaPetMapper } from '../mappers/prisma-pet-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaPetsRepository extends PetsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(pet: Pet): Promise<void> {
    const data = PrismaPetMapper.toPrisma(pet);

    await this.prisma.pet.create({
      data,
    });
  }

  public async findById(id: string): Promise<Pet | null> {
    const pet = await this.prisma.pet.findUnique({
      where: {
        id,
      },
    });

    if (!pet) {
      return null;
    }

    return PrismaPetMapper.toDomain(pet);
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.pet.delete({
      where: {
        id,
      },
    });
  }

  public async fetchManyByOwnerOrganizationID(
    ownerOrganizationID: string,
  ): Promise<Pet[]> {
    const rawPets = await this.prisma.pet.findMany({
      where: {
        ownerOrganizationID,
      },
    });

    return rawPets.map(PrismaPetMapper.toDomain);
  }
}
