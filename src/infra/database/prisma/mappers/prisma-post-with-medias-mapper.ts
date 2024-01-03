import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { PostWithMedias } from '@Domain/social-network/enterprise/entities/value-objects/post-with-medias';
import { Media as PrismaMedia, Post as PrismaPost } from '@prisma/client';

import { PrismaMediaMapper } from './prisma-media-mapper';

type PrismaPostWithMedias = PrismaPost & {
  medias: PrismaMedia[];
};

export class PrismaPostWithMediasMapper {
  public static toDomain(raw: PrismaPostWithMedias): PostWithMedias {
    return PostWithMedias.create({
      postID: new UniqueEntityID(raw.id),
      likes: raw.likes,
      medias: raw.medias.map(PrismaMediaMapper.toDomain),
      textContent: raw.textContent,
      createdAt: raw.createdAt,
    });
  }
}
