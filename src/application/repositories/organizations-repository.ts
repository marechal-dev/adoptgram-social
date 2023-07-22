import { PaginationParams } from '@Core/repositories/pagination-params';
import { Organization } from '@Domain/enterprise/entities/organization';

export abstract class OrganizationsRepository {
  abstract create(organization: Organization): Promise<Organization>;
  abstract save(organization: Organization): Promise<Organization>;
  abstract delete(id: string): Promise<boolean>;
  abstract getMany(params: PaginationParams): Promise<Organization[]>;
  abstract searchMany(
    query: string,
    params: PaginationParams,
  ): Promise<Organization[]>;
  abstract findById(id: string): Promise<Organization | null>;
  abstract findByUsername(username: string): Promise<Organization | null>;
  abstract findByEmail(email: string): Promise<Organization | null>;
}
