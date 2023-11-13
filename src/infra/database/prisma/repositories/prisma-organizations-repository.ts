import { PaginationParams } from '@Core/repositories/pagination-params';
import { OrganizationsRepository } from '@Domain/social-network/application/repositories/organizations-repository';
import { Organization } from '@Domain/social-network/enterprise/entities/organization';
import { Injectable } from '@nestjs/common';
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
