import { PaginationParams } from '@Core/repositories/pagination-params';
import { Organization } from '@Domain/enterprise/entities/organization';

export abstract class OrganizationsRepository {
  abstract create(organization: Organization): Promise<Organization>;
  abstract save(organization: Organization): Promise<Organization>;
  abstract delete(organization: Organization): Promise<boolean>;
  abstract getMany(params: PaginationParams): Promise<Organization[]>;
  abstract searchMany(query: string): Promise<Organization[]>;
  abstract findOneById(id: string): Promise<Organization | null>;
  abstract findOneByCnpj(cnpj: string): Promise<Organization | null>;
}
