import { PetsRepository } from '@Application/repositories/pets-repository';
import { Pet } from '@Domain/enterprise/entities/pet';

export class InMemoryPetsRepository extends PetsRepository {
  public readonly items: Pet[] = [];

  public async create(pet: Pet): Promise<Pet> {
    this.items.push(pet);

    return pet;
  }

  public async save(pet: Pet): Promise<Pet> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === pet.id.toString(),
    );

    if (index >= 0) {
      this.items[index] = pet;
    }

    return pet;
  }

  public async getById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id.toString() === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  public async fetchManyByOrganizationId(
    organizationId: string,
  ): Promise<Pet[]> {
    return this.items.filter(
      (item) => item.organizationId.toString() === organizationId,
    );
  }

  public async delete(pet: Pet): Promise<boolean> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === pet.id.toString(),
    );

    if (index < 0) {
      return false;
    }

    this.items.splice(index, 1);

    return true;
  }
}
