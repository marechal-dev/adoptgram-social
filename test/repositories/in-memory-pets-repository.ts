import { PetsRepository } from '@Domain/social-network/application/repositories/pets-repository';
import { Pet } from '@Domain/social-network/enterprise/entities/pet';

export class InMemoryPetsRepository extends PetsRepository {
  public items: Pet[] = [];

  public async create(pet: Pet): Promise<void> {
    this.items.push(pet);
  }

  public async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id.toString() === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  public async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== id);
  }

  public async fetchManyByOwnerOrganizationID(
    ownerOrganizationID: string,
  ): Promise<Pet[]> {
    return this.items.filter(
      (item) => item.ownerOrganizationID.toString() === ownerOrganizationID,
    );
  }
}
