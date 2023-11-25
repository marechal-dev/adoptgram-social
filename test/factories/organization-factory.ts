import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import {
  Organization,
  OrganizationProps,
} from '@Domain/social-network/enterprise/entities/organization';
import { Cnpj } from '@Domain/social-network/enterprise/entities/value-objects/cnpj';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaOrganizationMapper } from '@Infra/database/prisma/mappers/prisma-organization-mapper';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function makeOrganization(
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
      city: faker.location.city(),
      state: faker.location.state(),
      cnpj: override.cnpj ?? Cnpj.create('00.000.000/0001-00'),
      whatsapp: faker.phone.number(),
      ...override,
    },
    id,
  );

  return organization;
}

@Injectable()
export class PrismaOrganizationFactory {
  public constructor(private readonly prisma: PrismaService) {}

  public async makePrismaOrganization(data: Partial<OrganizationProps> = {}) {
    const organization = makeOrganization(data);

    await this.prisma.organization.create({
      data: PrismaOrganizationMapper.toPrisma(organization),
    });

    return organization;
  }
}
