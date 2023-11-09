import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Pet } from '@Domain/social-network/enterprise/entities/pet';
import { Prisma, Pet as PrismaPet } from '@prisma/client';

export class PrismaPetMapper {
  public static toPrisma(pet: Pet): Prisma.PetUncheckedCreateInput {
    return {
      id: pet.id.toString(),
      name: pet.name,
      age: pet.age,
      bio: pet.bio,
      energyLevel: pet.energyLevel,
      isCastrated: pet.isCastrated,
      isVaccinated: pet.isVaccinated,
      ownerOrganizationID: pet.ownerOrganizationID.toString(),
      requireMedicalAttention: pet.requireMedicalAttention,
      size: pet.size,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
    };
  }

  public static toDomain(raw: PrismaPet): Pet {
    return Pet.create(
      {
        name: raw.name,
        bio: raw.bio,
        age: raw.age,
        energyLevel: raw.energyLevel,
        isCastrated: raw.isCastrated,
        isVaccinated: raw.isVaccinated,
        ownerOrganizationID: new UniqueEntityID(raw.ownerOrganizationID),
        requireMedicalAttention: raw.requireMedicalAttention,
        size: raw.size,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }
}
