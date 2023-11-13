import { Organization } from '@Domain/social-network/enterprise/entities/organization';

export abstract class OrganizationsRepository {
  abstract create(organization: Organization): Promise<void>;
  abstract findById(id: string): Promise<Organization | null>;
  abstract findByUsername(username: string): Promise<Organization | null>;
  abstract findByEmail(email: string): Promise<Organization | null>;
  abstract findByCnpj(cnpj: string): Promise<Organization | null>;
  abstract delete(id: string): Promise<void>;
}
