import { faker } from '@faker-js/faker/locale/pt_BR';

import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import {
  Administrator,
  AdministratorProps,
} from '@Domain/social-network/enterprise/entities/administrator';
import { PrismaAdministratorMapper } from '@Infra/database/prisma/mappers/prisma-administrator-mapper';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function makeAdministrator(
  override: Partial<AdministratorProps> = {},
  id?: UniqueEntityID,
) {
  const administrator = Administrator.create(
    {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      ...override,
    },
    id,
  );

  return administrator;
}

@Injectable()
export class AdministratorFactory {
  public constructor(private readonly prisma: PrismaService) {}

  public async make(data: Partial<AdministratorProps> = {}) {
    const administrator = makeAdministrator(data);

    await this.prisma.administrator.create({
      data: PrismaAdministratorMapper.toPrisma(administrator),
    });

    return administrator;
  }
}
