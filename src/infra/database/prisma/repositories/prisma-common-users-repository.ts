import { Injectable } from '@nestjs/common';

import { CommonUsersRepository } from '@Domain/social-network/application/repositories/common-users-repository';
import { CommonUser } from '@Domain/social-network/enterprise/entities/common-user';

import { PrismaService } from '../prisma.service';
import { PrismaCommonUserMapper } from '../mappers/prisma-common-user-mapper';

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
