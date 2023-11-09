import { Module } from '@nestjs/common';

import { CommonUsersRepository } from '@Domain/social-network/application/repositories/common-users-repository';
import { FollowsRepository } from '@Domain/social-network/application/repositories/follows-repository';
import { OrganizationsRepository } from '@Domain/social-network/application/repositories/organizations-repository';
import { PetsRepository } from '@Domain/social-network/application/repositories/pets-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCommonUsersRepository } from './prisma/repositories/prisma-common-users-repository';
import { PrismaFollowsRepository } from './prisma/repositories/prisma-follows-repository';
import { PrismaOrganizationsRepository } from './prisma/repositories/prisma-organizations-repository';
import { PrismaPetsRepository } from './prisma/repositories/prisma-pets-repository';

@Module({
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
  ],
  exports: [
    PrismaService,
    CommonUsersRepository,
    OrganizationsRepository,
    FollowsRepository,
    PetsRepository,
  ],
})
export class DatabaseModule {}
