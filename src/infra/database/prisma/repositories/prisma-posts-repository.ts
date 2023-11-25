import { MediasRepository } from '@Domain/social-network/application/repositories/medias-repository';
import { PostsRepository } from '@Domain/social-network/application/repositories/posts-repository';
import { Post } from '@Domain/social-network/enterprise/entities/post';
import { Injectable } from '@nestjs/common';

import { PrismaPostMapper } from '../mappers/prisma-post-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaPostsRepository extends PostsRepository {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly mediasRepository: MediasRepository,
  ) {
    super();
  }

  public async create(post: Post): Promise<void> {
    await this.prisma.post.create({
      data: PrismaPostMapper.toPrisma(post),
    });

    await this.mediasRepository.createMany(post.medias.getItems());
  }

  public async delete(postID: string): Promise<void> {
    await this.mediasRepository.deleteManyByPostID(postID);

    await this.prisma.post.delete({
      where: {
        id: postID,
      },
    });
  }

  public async findByID(id: string): Promise<Post | null> {
    const rawPost = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!rawPost) {
      return null;
    }

    return PrismaPostMapper.toDomain(rawPost);
  }
}
