import { Injectable } from '@nestjs/common';

import { CommonUsersRepository } from '@Domain/social-network/application/repositories/common-users-repository';
import { CommonUser } from '@Domain/social-network/enterprise/entities/common-user';

import { FetchManyResult } from '@Core/repositories/fetch-many-result';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { PrismaCommonUserMapper } from '../mappers/prisma-common-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCommonUsersRepository extends CommonUsersRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(commonUser: CommonUser): Promise<void> {
    const data = PrismaCommonUserMapper.toPrisma(commonUser);

    await this.prisma.commonUser.create({
      data,
    });
  }

  public async fetchMany({
    page,
    pageSize,
  }: PaginationParams): Promise<FetchManyResult<CommonUser>> {
    const [totalCount, rawItems] = await Promise.all([
      this.prisma.commonUser.count(),
      this.prisma.commonUser.findMany({
        orderBy: {
          name: 'asc',
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
      }),
    ]);

    const items = rawItems.map(PrismaCommonUserMapper.toDomain);

    return {
      totalCount,
      items,
    };
  }

  public async findById(id: string): Promise<CommonUser | null> {
    const commonUser = await this.prisma.commonUser.findUnique({
      where: {
        id,
      },
    });

    if (!commonUser) {
      return null;
    }

    return PrismaCommonUserMapper.toDomain(commonUser);
  }

  public async findByUsername(username: string): Promise<CommonUser | null> {
    const commonUser = await this.prisma.commonUser.findUnique({
      where: {
        username,
      },
    });

    if (!commonUser) {
      return null;
    }

    return PrismaCommonUserMapper.toDomain(commonUser);
  }

  public async findByEmail(email: string): Promise<CommonUser | null> {
    const commonUser = await this.prisma.commonUser.findUnique({
      where: {
        email,
      },
    });

    if (!commonUser) {
      return null;
    }

    return PrismaCommonUserMapper.toDomain(commonUser);
  }

  public async findByCpf(cpf: string): Promise<CommonUser | null> {
    const commonUser = await this.prisma.commonUser.findUnique({
      where: {
        cpf,
      },
    });

    if (!commonUser) {
      return null;
    }

    return PrismaCommonUserMapper.toDomain(commonUser);
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.commonUser.delete({
      where: {
        id,
      },
    });
  }
}
