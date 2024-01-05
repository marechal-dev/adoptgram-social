import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import {
  Comment,
  CommentProps,
} from '@Domain/social-network/enterprise/entities/comment';
import { faker } from '@faker-js/faker';
import { PrismaCommentMapper } from '@Infra/database/prisma/mappers/prisma-comment-mapper';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function makeComment(
  override: Partial<CommentProps> = {},
  id?: UniqueEntityID,
) {
  return Comment.create(
    {
      content: faker.lorem.lines(1),
      creatorID: new UniqueEntityID(),
      postID: new UniqueEntityID(),
      ...override,
    },
    id,
  );
}

@Injectable()
export class CommentFactory {
  public constructor(private readonly prisma: PrismaService) {}

  public async make(data: Partial<CommentProps> = {}) {
    const comment = makeComment(data);

    await this.prisma.comment.create({
      data: PrismaCommentMapper.toPrisma(comment),
    });

    return comment;
  }
}
