import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { CommentWithCreator } from '@Domain/social-network/enterprise/entities/value-objects/comment-with-creator';
import {
  Comment as PrismaComment,
  CommonUser as PrismaCommonUser,
} from '@prisma/client';

import { PrismaCommonUserMapper } from './prisma-common-user-mapper';

export type PrismaCommentWithCreator = PrismaComment & {
  creator: PrismaCommonUser;
};

export class PrismaCommentWithCreatorMapper {
  public static toDomain(raw: PrismaCommentWithCreator) {
    return CommentWithCreator.create({
      id: new UniqueEntityID(raw.id),
      postID: new UniqueEntityID(raw.postID),
      creator: PrismaCommonUserMapper.toDomain(raw.creator),
      content: raw.content,
      createdAt: raw.createdAt,
    });
  }
}
