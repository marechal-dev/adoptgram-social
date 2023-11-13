import { faker } from '@faker-js/faker/locale/pt_BR';

import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import {
  CommonUser,
  CommonUserProps,
} from '@Domain/social-network/enterprise/entities/common-user';
import { Cpf } from '@Domain/social-network/enterprise/entities/value-objects/cpf';
import { PrismaCommonUserMapper } from '@Infra/database/prisma/mappers/prisma-common-user-mapper';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function makeCommonUser(
  override: Partial<CommonUserProps> = {},
  id?: UniqueEntityID,
) {
  const commonUser = CommonUser.create(
    {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      cpf: override.cpf ?? Cpf.create('000.000.000-00'),
      ...override,
    },
    id,
  );

  return commonUser;
}

@Injectable()
export class CommonUserFactory {
  public constructor(private readonly prisma: PrismaService) {}

  public async make(data: Partial<CommonUserProps> = {}) {
    const commonUser = makeCommonUser(data);

    await this.prisma.commonUser.create({
      data: PrismaCommonUserMapper.toPrisma(commonUser),
    });

    return commonUser;
  }
}
