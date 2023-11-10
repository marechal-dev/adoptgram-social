import { Pet } from '@Domain/social-network/enterprise/entities/pet';

export abstract class PetsRepository {
  abstract create(pet: Pet): Promise<void>;
  abstract findById(id: string): Promise<Pet | null>;
  abstract delete(id: string): Promise<void>;
  abstract fetchManyByOwnerOrganizationID(
    ownerOrganizationID: string,
  ): Promise<Pet[]>;
}
