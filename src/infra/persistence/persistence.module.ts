import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CommonUsersRepository } from '@Application/repositories/common-users-repository';
import { PrismaCommonUsersRepository } from './prisma/repositories/prisma-common-users-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CommonUsersRepository,
      useClass: PrismaCommonUsersRepository,
    },
  ],
  exports: [PrismaService, CommonUsersRepository],
})
export class PersistenceModule {}
