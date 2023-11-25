import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Media } from '@Domain/social-network/enterprise/entities/media';
import { Prisma, Media as PrismaMedia } from '@prisma/client';

export class PrismaMediaMapper {
  public static toDomain(raw: PrismaMedia): Media {
    return Media.create(
      {
        postID: new UniqueEntityID(raw.postId),
        type: raw.type,
        url: raw.url,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  public static toPrisma(media: Media): Prisma.MediaUncheckedCreateInput {
    return {
      id: media.id.toString(),
      postId: media.postID.toString(),
      type: media.type,
      url: media.url,
      createdAt: media.createdAt,
    };
  }
}
