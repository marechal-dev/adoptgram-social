import { PostsRepository } from '@Domain/social-network/application/repositories/posts-repository';
import { Post } from '@Domain/social-network/enterprise/entities/post';
import { Injectable } from '@nestjs/common';

import { PrismaPostMapper } from '../mappers/prisma-post-mapper';
import { PrismaService } from '../prisma.service';

import { PrismaMediasRepository } from './prisma-medias-repository';

@Injectable()
export class PrismaPostsRepository extends PostsRepository {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly mediasRepository: PrismaMediasRepository,
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
}
