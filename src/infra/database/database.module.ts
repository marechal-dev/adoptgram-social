import { Module } from '@nestjs/common';

import { CommonUsersRepository } from '@Domain/social-network/application/repositories/common-users-repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaCommonUsersRepository } from './prisma/repositories/prisma-common-users-repository';
import { OrganizationsRepository } from '@Domain/social-network/application/repositories/organizations-repository';
import { PrismaOrganizationsRepository } from './prisma/repositories/prisma-organizations-repository';

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
  ],
  exports: [PrismaService, CommonUsersRepository, OrganizationsRepository],
})
export class DatabaseModule {}
