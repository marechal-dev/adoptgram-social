import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { PostDetails } from '@Domain/social-network/enterprise/entities/value-objects/post-details';
import {
  Media as PrismaMedia,
  Organization as PrismaOrganization,
  Post as PrismaPost,
} from '@prisma/client';

import {
  PrismaCommentWithCreator,
  PrismaCommentWithCreatorMapper,
} from './prisma-comment-with-creator-mapper';
import { PrismaMediaMapper } from './prisma-media-mapper';
import { PrismaOrganizationMapper } from './prisma-organization-mapper';

type PrismaPostDetails = PrismaPost & {
  organization: PrismaOrganization;
  medias: PrismaMedia[];
  comments: PrismaCommentWithCreator[];
};

export class PrismaPostDetailsMapper {
  public static toDomain(raw: PrismaPostDetails): PostDetails {
    return PostDetails.create({
      postID: new UniqueEntityID(raw.id),
      textContent: raw.textContent,
      likes: raw.likes,
      medias: raw.medias.map(PrismaMediaMapper.toDomain),
      comments: raw.comments.map(PrismaCommentWithCreatorMapper.toDomain),
      organization: PrismaOrganizationMapper.toDomain(raw.organization),
      createdAt: raw.createdAt,
    });
  }
}
