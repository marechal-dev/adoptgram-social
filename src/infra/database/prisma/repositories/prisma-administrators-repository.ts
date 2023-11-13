import { AdministratorsRepository } from '@Domain/social-network/application/repositories/administrators-repository';
import { Administrator } from '@Domain/social-network/enterprise/entities/administrator';
import { Injectable } from '@nestjs/common';
import { PrismaAdministratorMapper } from '../mappers/prisma-administrator-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAdministratorsRepository extends AdministratorsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async findByEmail(email: string): Promise<Administrator | null> {
    const raw = await this.prisma.administrator.findUnique({
      where: {
        email,
      },
    });

    if (!raw) {
      return null;
    }

    return PrismaAdministratorMapper.toDomain(raw);
  }
}
