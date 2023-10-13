import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import {
  Follow,
  FollowProps,
} from '@Domain/social-network/enterprise/entities/follow';
import { FollowID } from '@Domain/social-network/enterprise/entities/follow-id';
import { PrismaFollowMapper } from '@Infra/database/prisma/mappers/prisma-follow-mapper';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export class FollowFactory {
  public static make(override: Partial<FollowProps> = {}): Follow {
    const commonUserID = override.commonUserID ?? new UniqueEntityID();
    const organizationID = override.organizationID ?? new UniqueEntityID();
    const followID = new FollowID(commonUserID, organizationID);

    const follow = Follow.create(
      {
        commonUserID,
        organizationID,
        ...override,
      },
      followID,
    );

    return follow;
  }
}

@Injectable()
export class PrismaFollowFactory {
  public constructor(private readonly prisma: PrismaService) {}

  public async makePrismaFollow(data: Partial<FollowProps> = {}) {
    const follow = FollowFactory.make(data);

    await this.prisma.follow.create({
      data: PrismaFollowMapper.toPrisma(follow),
    });

    return follow;
  }
}
