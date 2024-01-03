import { FetchManyResult } from '@Core/repositories/fetch-many-result';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { Organization } from '@Domain/social-network/enterprise/entities/organization';
import { OrganizationDetails } from '@Domain/social-network/enterprise/entities/value-objects/organization-details';

export abstract class OrganizationsRepository {
  abstract create(organization: Organization): Promise<void>;
  abstract fetchMany(
    paginationParams: PaginationParams,
  ): Promise<FetchManyResult<Organization>>;
  abstract searchMany(query: string): Promise<Organization[]>;
  abstract findById(id: string): Promise<Organization | null>;
  abstract findDetailsByUsername(
    id: string,
  ): Promise<OrganizationDetails | null>;
  abstract findByUsername(username: string): Promise<Organization | null>;
  abstract findByEmail(email: string): Promise<Organization | null>;
  abstract findByCnpj(cnpj: string): Promise<Organization | null>;
  abstract delete(id: string): Promise<void>;
}
