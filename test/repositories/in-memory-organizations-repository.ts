import { PaginationParams } from '@Core/repositories/pagination-params';
import { Organization } from '@Domain/enterprise/entities/organization';
import { OrganizationsRepository } from '@Application/repositories/organizations-repository';

export class InMemoryOrganizationsRepository extends OrganizationsRepository {
  public readonly items: Organization[] = [];

  public async create(organization: Organization): Promise<Organization> {
    this.items.push(organization);

    return organization;
  }

  public async save(organization: Organization): Promise<Organization> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === organization.id.toString(),
    );

    if (index >= 0) {
      this.items[index] = organization;
    }

    return organization;
  }

  public async delete(id: string): Promise<boolean> {
    const index = this.items.findIndex((item) => item.id.toString() === id);

    if (index >= 0) {
      this.items.splice(index, 1);

      return true;
    }

    return false;
  }

  public async getMany({
    page,
    pageSize,
  }: PaginationParams): Promise<Organization[]> {
    return this.items.slice((page - 1) * pageSize, page * pageSize);
  }

  public async searchMany(
    query: string,
    { page, pageSize }: PaginationParams,
  ): Promise<Organization[]> {
    const queried = this.items
      .filter((item) => item.title.toLowerCase() === query)
      .slice((page - 1) * pageSize, page * pageSize);

    return queried;
  }

  public async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.id.toString() === id);

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
