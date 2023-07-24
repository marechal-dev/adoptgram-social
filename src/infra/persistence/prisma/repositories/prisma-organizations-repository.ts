import { Injectable } from '@nestjs/common';
import { OrganizationsRepository } from '@Application/repositories/organizations-repository';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { Organization } from '@Domain/enterprise/entities/organization';
import { PrismaService } from '../prisma.service';
import { PrismaOrganizationMapper } from '../mappers/prisma-organization-mapper';

@Injectable()
export class PrismaOrganizationsRepository extends OrganizationsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(organization: Organization): Promise<Organization> {
    const prismaOrg = PrismaOrganizationMapper.toPrisma(organization);

    await this.prisma.organization.create({
      data: {
        ...prismaOrg,
        address: {
          create: {
            ...organization.address.toValue(),
          },
        },
      },
    });

    return organization;
  }

  public async save(organization: Organization): Promise<Organization> {
    await this.prisma.organization.update({
      where: {
        id: organization.id.toString(),
      },
      data: PrismaOrganizationMapper.toPrisma(organization),
    });

    return organization;
  }

  public async delete(id: string): Promise<boolean> {
    const deleted = await this.prisma.organization.delete({
      where: {
        id,
      },
    });

    if (!deleted) {
      return false;
    }

    return true;
  }

  public async getMany({
    page,
    pageSize,
  }: PaginationParams): Promise<Organization[]> {
    const items = await this.prisma.organization.findMany({
      include: {
        address: true,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return items.map(PrismaOrganizationMapper.toDomain);
  }

  public async searchMany(
    query: string,
    { page, pageSize }: PaginationParams,
  ): Promise<Organization[]> {
    const items = await this.prisma.organization.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      include: {
        address: true,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return items.map(PrismaOrganizationMapper.toDomain);
  }

  public async findById(id: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        id,
      },
      include: {
        address: true,
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
      include: {
        address: true,
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
      include: {
        address: true,
      },
    });

    if (!organization) {
      return null;
    }

    return PrismaOrganizationMapper.toDomain(organization);
  }
}
