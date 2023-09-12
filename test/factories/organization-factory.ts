import { faker } from '@faker-js/faker/locale/pt_BR';

import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import {
  Organization,
  OrganizationProps,
} from '@Domain/social-network/enterprise/entities/organization';
import { Cnpj } from '@Domain/social-network/enterprise/entities/value-objects/cnpj';

export class OrganizationFactory {
  public static make(
    override: Partial<OrganizationProps> = {},
    id?: UniqueEntityID,
  ): Organization {
    const organization = Organization.create(
      {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        title: faker.company.name(),
        representativeName: faker.person.fullName(),
        cnpj: override.cnpj ?? Cnpj.create('00.000.000/0001-00'),
        whatsapp: faker.phone.number(),
        ...override,
      },
      id,
    );

    return organization;
  }
}
