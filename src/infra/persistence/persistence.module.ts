import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CommonUsersRepository } from '@Application/repositories/common-users-repository';
import { PrismaCommonUsersRepository } from './prisma/repositories/prisma-common-users-repository';
import { OrganizationsRepository } from '@Application/repositories/organizations-repository';
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
export class PersistenceModule {}
