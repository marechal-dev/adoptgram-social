import { Pet } from '@Domain/social-network/enterprise/entities/pet';

export class PetPresenter {
  public static toHTTP(pet: Pet) {
    return {
      id: pet.id.toString(),
      name: pet.name,
      age: pet.age,
      bio: pet.bio,
      profilePictureURL: pet.profilePictureURL,
      isCastrated: pet.isCastrated,
      isVaccinated: pet.isVaccinated,
      requireMedicalAttention: pet.requireMedicalAttention,
      size: pet.size,
      energyLevel: pet.energyLevel,
      createdAt: pet.createdAt,
    };
  }
}
