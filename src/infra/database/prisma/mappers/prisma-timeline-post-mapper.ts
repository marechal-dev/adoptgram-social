import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { TimelinePost } from '@Domain/social-network/enterprise/entities/value-objects/timeline-post';
import {
  Media as PrismaMedia,
  Organization as PrismaOrganization,
  Post as PrismaPost,
} from '@prisma/client';

import { PrismaMediaMapper } from './prisma-media-mapper';
import { PrismaOrganizationMapper } from './prisma-organization-mapper';

type PrismaTimelinePost = PrismaPost & {
  organization: PrismaOrganization;
  medias: PrismaMedia[];
};

export class PrismaTimelinePostMapper {
  public static toDomain(raw: PrismaTimelinePost) {
    return TimelinePost.create({
      postID: new UniqueEntityID(raw.id),
      organization: PrismaOrganizationMapper.toDomain(raw.organization),
      medias: raw.medias.map(PrismaMediaMapper.toDomain),
      textContent: raw.textContent,
      likes: raw.likes,
      createdAt: raw.createdAt,
    });
  }
}
