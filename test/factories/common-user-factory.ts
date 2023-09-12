import { faker } from '@faker-js/faker/locale/pt_BR';

import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import {
  CommonUser,
  CommonUserProps,
} from '@Domain/social-network/enterprise/entities/common-user';
import { Cpf } from '@Domain/social-network/enterprise/entities/value-objects/cpf';

export class CommonUserFactory {
  public static make(
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
}
