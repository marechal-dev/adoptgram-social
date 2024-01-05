import { CommentsRepository } from '@Domain/social-network/application/repositories/comments-repository';
import { Comment } from '@Domain/social-network/enterprise/entities/comment';
import { CommentWithCreator } from '@Domain/social-network/enterprise/entities/value-objects/comment-with-creator';
import { Injectable } from '@nestjs/common';

import { PrismaCommentMapper } from '../mappers/prisma-comment-mapper';
import { PrismaCommentWithCreatorMapper } from '../mappers/prisma-comment-with-creator-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCommentsRepository extends CommentsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(comment: Comment): Promise<void> {
    const data = PrismaCommentMapper.toPrisma(comment);

    await this.prisma.comment.create({
      data,
    });
  }

  public async findManyByPostID(postID: string): Promise<Comment[]> {
    const raws = await this.prisma.comment.findMany({
      where: {
        postID,
      },
    });

    return raws.map(PrismaCommentMapper.toDomain);
  }

  public async findManyWithCreatorByPostID(
    postID: string,
  ): Promise<CommentWithCreator[]> {
    const raws = await this.prisma.comment.findMany({
      where: {
        postID,
      },
      include: {
        creator: true,
      },
    });

    return raws.map(PrismaCommentWithCreatorMapper.toDomain);
  }
}
