import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Comment } from '@Domain/social-network/enterprise/entities/comment';
import { Prisma, Comment as PrismaComment } from '@prisma/client';

export class PrismaCommentMapper {
  public static toDomain(raw: PrismaComment): Comment {
    return Comment.create(
      {
        postID: new UniqueEntityID(raw.postID),
        creatorID: new UniqueEntityID(raw.creatorID),
        content: raw.content,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  public static toPrisma(comment: Comment): Prisma.CommentUncheckedCreateInput {
    return {
      id: comment.id.toString(),
      postID: comment.postID.toString(),
      creatorID: comment.creatorID.toString(),
      content: comment.content,
      createdAt: comment.createdAt,
    };
  }
}
