import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import {
  Post,
  PostProps,
} from '@Domain/social-network/enterprise/entities/post';
import { PrismaPostMapper } from '@Infra/database/prisma/mappers/prisma-post-mapper';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Injectable } from '@nestjs/common';

export function makePost(
  override: Partial<PostProps> = {},
  id?: UniqueEntityID,
) {
  const post = Post.create(
    {
      textContent: faker.lorem.paragraph(),
      organizationID: override.organizationID ?? new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return post;
}

@Injectable()
export class PostFactory {
  public constructor(private readonly prisma: PrismaService) {}

  public async make(data: Partial<PostProps> = {}) {
    const post = makePost(data);

    await this.prisma.post.create({
      data: PrismaPostMapper.toPrisma(post),
    });
  }
}
