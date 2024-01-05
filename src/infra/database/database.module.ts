import { AdministratorsRepository } from '@Domain/social-network/application/repositories/administrators-repository';
import { CommentsRepository } from '@Domain/social-network/application/repositories/comments-repository';
import { CommonUsersRepository } from '@Domain/social-network/application/repositories/common-users-repository';
import { FollowsRepository } from '@Domain/social-network/application/repositories/follows-repository';
import { MediasRepository } from '@Domain/social-network/application/repositories/medias-repository';
import { OrganizationsRepository } from '@Domain/social-network/application/repositories/organizations-repository';
import { PetsRepository } from '@Domain/social-network/application/repositories/pets-repository';
import { PostsRepository } from '@Domain/social-network/application/repositories/posts-repository';
import { CacheModule } from '@Infra/cache/cache.module';
import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaAdministratorsRepository } from './prisma/repositories/prisma-administrators-repository';
import { PrismaCommentsRepository } from './prisma/repositories/prisma-comments-repository';
import { PrismaCommonUsersRepository } from './prisma/repositories/prisma-common-users-repository';
import { PrismaFollowsRepository } from './prisma/repositories/prisma-follows-repository';
import { PrismaMediasRepository } from './prisma/repositories/prisma-medias-repository';
import { PrismaOrganizationsRepository } from './prisma/repositories/prisma-organizations-repository';
import { PrismaPetsRepository } from './prisma/repositories/prisma-pets-repository';
import { PrismaPostsRepository } from './prisma/repositories/prisma-posts-repository';

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: CommonUsersRepository,
      useClass: PrismaCommonUsersRepository,
    },
    {
      provide: OrganizationsRepository,
      useClass: PrismaOrganizationsRepository,
    },
    {
      provide: FollowsRepository,
      useClass: PrismaFollowsRepository,
    },
    {
      provide: PetsRepository,
      useClass: PrismaPetsRepository,
    },
    {
      provide: AdministratorsRepository,
      useClass: PrismaAdministratorsRepository,
    },
    {
      provide: MediasRepository,
      useClass: PrismaMediasRepository,
    },
    {
      provide: PostsRepository,
      useClass: PrismaPostsRepository,
    },
    {
      provide: CommentsRepository,
      useClass: PrismaCommentsRepository,
    },
  ],
  exports: [
    PrismaService,
    CommonUsersRepository,
    OrganizationsRepository,
    FollowsRepository,
    PetsRepository,
    AdministratorsRepository,
    MediasRepository,
    PostsRepository,
    CommentsRepository,
  ],
})
export class DatabaseModule {}
