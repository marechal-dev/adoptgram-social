import {
  AccountsIDsParams,
  FollowsRepository,
} from '@Domain/social-network/application/repositories/follows-repository';
import { Follow } from '@Domain/social-network/enterprise/entities/follow';
import { Injectable } from '@nestjs/common';
import { PrismaFollowMapper } from '../mappers/prisma-follow-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaFollowsRepository extends FollowsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(follow: Follow): Promise<void> {
    await this.prisma.follow.create({
      data: {
        commonUserID: follow.commonUserID.toString(),
        organizationID: follow.organizationID.toString(),
      },
    });
  }

  public async findOneByAccountsIDs({
    commonUserID,
    organizationID,
  }: AccountsIDsParams): Promise<Follow | null> {
    const follow = await this.prisma.follow.findUnique({
      where: {
        commonUserID_organizationID: {
          commonUserID,
          organizationID,
        },
      },
    });

    if (!follow) {
      return null;
    }

    return PrismaFollowMapper.toDomain(follow);
  }

  public async deleteOneByAccountsIDs({
    commonUserID,
    organizationID,
  }: AccountsIDsParams): Promise<void> {
    await this.prisma.follow.delete({
      where: {
        commonUserID_organizationID: {
          commonUserID,
          organizationID,
        },
      },
    });
  }

  public async findManyByOrganizationID(
    organizationID: string,
  ): Promise<Follow[]> {
    const rawFollows = await this.prisma.follow.findMany({
      where: {
        organizationID,
      },
    });

    return rawFollows.map(PrismaFollowMapper.toDomain);
  }

  public async findManyByCommonUserID(commonUserID: string): Promise<Follow[]> {
    const rawFollows = await this.prisma.follow.findMany({
      where: {
        commonUserID,
      },
    });

    return rawFollows.map(PrismaFollowMapper.toDomain);
  }
}
