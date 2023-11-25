import { MediasRepository } from '@Domain/social-network/application/repositories/medias-repository';
import { Media } from '@Domain/social-network/enterprise/entities/media';
import { Injectable } from '@nestjs/common';

import { PrismaMediaMapper } from '../mappers/prisma-media-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaMediasRepository extends MediasRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async createMany(medias: Media[]): Promise<void> {
    if (medias.length === 0) {
      return;
    }

    await this.prisma.media.createMany({
      data: medias.map(PrismaMediaMapper.toPrisma),
    });
  }

  public async deleteMany(medias: Media[]): Promise<void> {
    if (medias.length === 0) {
      return;
    }

    const mediasIDs = medias.map((media) => media.id.toString());

    await this.prisma.media.deleteMany({
      where: {
        id: {
          in: mediasIDs,
        },
      },
    });
  }

  public async findManyByPostID(postID: string): Promise<Media[]> {
    const rawMedias = await this.prisma.media.findMany({
      where: {
        postId: postID,
      },
    });

    return rawMedias.map(PrismaMediaMapper.toDomain);
  }

  public async deleteManyByPostID(postID: string): Promise<void> {
    await this.prisma.media.deleteMany({
      where: {
        postId: postID,
      },
    });
  }
}
