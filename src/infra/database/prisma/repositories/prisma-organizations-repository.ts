import { FetchManyResult } from '@Core/repositories/fetch-many-result';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { OrganizationsRepository } from '@Domain/social-network/application/repositories/organizations-repository';
import { Organization } from '@Domain/social-network/enterprise/entities/organization';
import { OrganizationDetails } from '@Domain/social-network/enterprise/entities/value-objects/organization-details';
import { Injectable } from '@nestjs/common';

import { PrismaOrganizationDetailsMapper } from '../mappers/prisma-organization-details-mapper';
import { PrismaOrganizationMapper } from '../mappers/prisma-organization-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrganizationsRepository extends OrganizationsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(organization: Organization): Promise<void> {
    const data = PrismaOrganizationMapper.toPrisma(organization);

    await this.prisma.organization.create({
      data,
    });
  }

  public async fetchMany({
    page,
    pageSize,
  }: PaginationParams): Promise<FetchManyResult<Organization>> {
    const [totalCount, rawItems] = await Promise.all([
      this.prisma.organization.count(),
      this.prisma.organization.findMany({
        orderBy: {
          title: 'asc',
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
      }),
    ]);

    const items = rawItems.map(PrismaOrganizationMapper.toDomain);

    return {
      totalCount,
      items,
    };
  }

  public async searchMany(query: string): Promise<Organization[]> {
    const result = await this.prisma.organization.findMany();

    return result
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.username.toLowerCase().includes(query),
      )
      .map(PrismaOrganizationMapper.toDomain);
  }

  public async findManyByTitle(
    title: string,
    { page, pageSize }: PaginationParams,
  ): Promise<Organization[]> {
    const organizations = await this.prisma.organization.findMany({
      where: {
        title: {
          search: title,
        },
      },
      orderBy: {
        _relevance: {
          fields: ['title'],
          search: 'database',
          sort: 'desc',
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return organizations.map(PrismaOrganizationMapper.toDomain);
  }

  public async findById(id: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        id,
      },
    });

    if (!organization) {
      return null;
    }

    return PrismaOrganizationMapper.toDomain(organization);
  }

  public async findDetailsByUsername(
    username: string,
  ): Promise<OrganizationDetails | null> {
    const result = await this.prisma.organization.findUnique({
      where: {
        username,
      },
      include: {
        followers: true,
        posts: {
          include: {
            medias: true,
          },
        },
        availablePets: true,
      },
    });

    if (!result) {
      return null;
    }

    return PrismaOrganizationDetailsMapper.toDomain(result);
  }

  public async findByUsername(username: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        username,
      },
    });

    if (!organization) {
      return null;
    }

    return PrismaOrganizationMapper.toDomain(organization);
  }

  public async findByEmail(email: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        email,
      },
    });

    if (!organization) {
      return null;
    }

    return PrismaOrganizationMapper.toDomain(organization);
  }

  public async findByCnpj(cnpj: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        cnpj,
      },
    });

    if (!organization) {
      return null;
    }

    return PrismaOrganizationMapper.toDomain(organization);
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.organization.delete({
      where: {
        id,
      },
    });
  }
}
