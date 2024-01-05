import { FetchManyResult } from '@Core/repositories/fetch-many-result';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { OrganizationsRepository } from '@Domain/social-network/application/repositories/organizations-repository';
import { Organization } from '@Domain/social-network/enterprise/entities/organization';
import { OrganizationDetails } from '@Domain/social-network/enterprise/entities/value-objects/organization-details';

import { InMemoryFollowsRepository } from './in-memory-follows-repository';
import { InMemoryPetsRepository } from './in-memory-pets-repository';
import { InMemoryPostsRepository } from './in-memory-posts-repository';

export class InMemoryOrganizationsRepository extends OrganizationsRepository {
  public items: Organization[] = [];

  public constructor(
    private readonly followsRepository: InMemoryFollowsRepository,
    private readonly postsRepository: InMemoryPostsRepository,
    private readonly petsRepository: InMemoryPetsRepository,
  ) {
    super();
  }

  public async create(organization: Organization): Promise<void> {
    this.items.push(organization);
  }

  public async fetchMany({
    page,
    pageSize,
  }: PaginationParams): Promise<FetchManyResult<Organization>> {
    const items = this.items.slice((page - 1) * pageSize, page * pageSize);

    return {
      totalCount: this.items.length,
      items,
    };
  }

  public async searchMany(query: string): Promise<Organization[]> {
    return this.items.filter(
      (item) => item.title.includes(query) || item.username.includes(query),
    );
  }

  public async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.id.toString() === id);

    if (!organization) {
      return null;
    }

    return organization;
  }

  public async findDetailsByUsername(
    username: string,
  ): Promise<OrganizationDetails | null> {
    const organization = this.items.find((item) => item.username === username);

    if (!organization) {
      return null;
    }

    const follows = await this.followsRepository.findManyByOrganizationID(
      organization.id.toString(),
    );
    const posts = await this.postsRepository.fetchManyByOrganizationID(
      organization.id.toString(),
    );
    const pets = await this.petsRepository.fetchManyByOwnerOrganizationID(
      organization.id.toString(),
    );

    return OrganizationDetails.create({
      id: organization.id,
      organization,
      followersCount: follows.length,
      posts,
      pets,
    });
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

  public async findManyByTitle(
    title: string,
    { page, pageSize }: PaginationParams,
  ): Promise<Organization[]> {
    const organizations = this.items
      .filter((item) => item.title.toLowerCase().includes(title.toLowerCase()))
      .slice((page - 1) * pageSize, page * pageSize);

    return organizations;
  }

  public async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== id);
  }
}
