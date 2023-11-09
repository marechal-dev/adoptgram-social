import { PetsRepository } from '@Domain/social-network/application/repositories/pets-repository';
import { Pet } from '@Domain/social-network/enterprise/entities/pet';

export class InMemoryPetsRepository extends PetsRepository {
  public items: Pet[] = [];

  public async create(pet: Pet): Promise<void> {
    this.items.push(pet);
  }

  public async fetchManyByOwnerOrganizationID(
    ownerOrganizationID: string,
  ): Promise<Pet[]> {
    return this.items.filter(
      (item) => item.ownerOrganizationID.toString() === ownerOrganizationID,
    );
  }
}
