import { Pet } from '@Domain/social-network/enterprise/entities/pet';

export abstract class PetsRepository {
  abstract create(pet: Pet): Promise<void>;
  abstract fetchManyByOwnerOrganizationID(
    ownerOrganizationID: string,
  ): Promise<Pet[]>;
}
