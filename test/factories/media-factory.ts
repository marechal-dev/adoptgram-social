import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import {
  Media,
  MediaProps,
} from '@Domain/social-network/enterprise/entities/media';
import { PrismaMediaMapper } from '@Infra/database/prisma/mappers/prisma-media-mapper';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Injectable } from '@nestjs/common';

export function makeMedia(
  override: Partial<MediaProps> = {},
  id?: UniqueEntityID,
) {
  return Media.create(
    {
      postID: override.postID ?? new UniqueEntityID(),
      url: override.url ?? faker.internet.url(),
      type: override.type ?? 'Image',
      ...override,
    },
    id,
  );
}

@Injectable()
export class MediaFactory {
  public constructor(private readonly prisma: PrismaService) {}

  public async make(data: Partial<MediaProps> = {}) {
    const media = makeMedia(data);

    await this.prisma.media.create({
      data: PrismaMediaMapper.toPrisma(media),
    });

    return media;
  }
}
