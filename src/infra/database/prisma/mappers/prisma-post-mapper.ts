import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Post } from '@Domain/social-network/enterprise/entities/post';
import { Prisma, Post as PrismaPost } from '@prisma/client';

export class PrismaPostMapper {
  public static toDomain(raw: PrismaPost): Post {
    return Post.create(
      {
        organizationID: new UniqueEntityID(raw.organizationId),
        textContent: raw.textContent,
        createdAt: raw.createdAt,
        likes: raw.likes,
      },
      new UniqueEntityID(raw.id),
    );
  }

  public static toPrisma(post: Post): Prisma.PostUncheckedCreateInput {
    return {
      id: post.id.toString(),
      organizationId: post.organizationID.toString(),
      textContent: post.textContent,
      likes: post.likes,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
