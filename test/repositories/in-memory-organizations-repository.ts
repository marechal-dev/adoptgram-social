import { OrganizationsRepository } from '@Domain/social-network/application/repositories/organizations-repository';
import { Organization } from '@Domain/social-network/enterprise/entities/organization';

export class InMemoryOrganizationsRepository extends OrganizationsRepository {
  public readonly items: Organization[] = [];

  public async create(organization: Organization): Promise<void> {
    this.items.push(organization);
  }

  public async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.id.toString() === id);

    if (!organization) {
      return null;
    }

    return organization;
  }

  public async findByCnpj(cnpj: string): Promise<Organization | null> {
    const organization = this.items.find(
      (item) => item.cnpj.toString() === cnpj,
    );

    if (!organization) {
      return null;
    }

    return organization;
  }

  public async findByUsername(username: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.username === username);

    if (!organization) {
      return null;
    }

    return organization;
  }

  public async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.email === email);

    if (!organization) {
      return null;
    }

    return organization;
  }
}
