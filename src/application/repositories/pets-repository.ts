import { Pet } from '@Domain/enterprise/entities/pet';

export abstract class PetsRepository {
  abstract create(pet: Pet): Promise<Pet>;
  abstract save(pet: Pet): Promise<Pet>;
  abstract getById(id: string): Promise<Pet | null>;
  abstract fetchManyByOrganizationId(organizationId: string): Promise<Pet[]>;
  abstract delete(pet: Pet): Promise<boolean>;
}
