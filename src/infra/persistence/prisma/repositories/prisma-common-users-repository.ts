import { Injectable } from '@nestjs/common';
import { CommonUsersRepository } from '@Application/repositories/common-users-repository';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { CommonUser } from '@Domain/enterprise/entities/common-user';
import { PrismaService } from '../prisma.service';
import { PrismaCommonUserMapper } from '../mappers/prisma-common-user-mapper';

@Injectable()
export class PrismaCommonUsersRepository extends CommonUsersRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(commonUser: CommonUser): Promise<CommonUser> {
    await this.prisma.commonUser.create({
      data: PrismaCommonUserMapper.toPrisma(commonUser),
    });

    return commonUser;
  }

  public async save(commonUser: CommonUser): Promise<CommonUser> {
    await this.prisma.commonUser.update({
      where: {
        id: commonUser.id.toString(),
      },
      data: PrismaCommonUserMapper.toPrisma(commonUser),
    });

    return commonUser;
  }

  public async delete(id: string): Promise<boolean> {
    const commonUser = await this.prisma.commonUser.delete({
      where: {
        id,
      },
    });

    if (!commonUser) {
      return false;
    }

    return true;
  }

  public async getMany({
    page,
    pageSize,
  }: PaginationParams): Promise<CommonUser[]> {
    const commonUsers = await this.prisma.commonUser.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return commonUsers.map(PrismaCommonUserMapper.toDomain);
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
}
