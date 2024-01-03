import { FetchManyResult } from '@Core/repositories/fetch-many-result';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { Organization } from '@Domain/social-network/enterprise/entities/organization';

export abstract class OrganizationsRepository {
  abstract create(organization: Organization): Promise<void>;
  abstract fetchMany(
    paginationParams: PaginationParams,
  ): Promise<FetchManyResult<Organization>>;
  abstract searchMany(query: string): Promise<Organization[]>;
  abstract findById(id: string): Promise<Organization | null>;
  abstract findByUsername(username: string): Promise<Organization | null>;
  abstract findByEmail(email: string): Promise<Organization | null>;
  abstract findByCnpj(cnpj: string): Promise<Organization | null>;
  abstract delete(id: string): Promise<void>;
}
