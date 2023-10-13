import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Follow } from '@Domain/social-network/enterprise/entities/follow';
import { FollowID } from '@Domain/social-network/enterprise/entities/follow-id';
import { Prisma, Follow as PrismaFollow } from '@prisma/client';

export class PrismaFollowMapper {
  public static toPrisma(follow: Follow): Prisma.FollowUncheckedCreateInput {
    return {
      commonUserID: follow.commonUserID.toString(),
      organizationID: follow.organizationID.toString(),
    };
  }

  public static toDomain(raw: PrismaFollow): Follow {
    const commonUserID = new UniqueEntityID(raw.commonUserID);
    const organizationID = new UniqueEntityID(raw.organizationID);

    return Follow.create(
      {
        commonUserID,
        organizationID,
        createdAt: raw.createdAt,
      },
      new FollowID(commonUserID, organizationID),
    );
  }
}
