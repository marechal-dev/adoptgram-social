import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Module({
  exports: [PrismaService],
})
export class PersistenceModule {}
