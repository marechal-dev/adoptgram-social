import { Prisma, Organization as PrismaOrganization } from '@prisma/client';
import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Organization } from '@Domain/social-network/enterprise/entities/organization';
import { Cnpj } from '@Domain/social-network/enterprise/entities/value-objects/cnpj';

export class PrismaOrganizationMapper {
  public static toPrisma(
    organization: Organization,
  ): Prisma.OrganizationUncheckedCreateInput {
    return {
      id: organization.id.toString(),
      username: organization.username,
      email: organization.email,
      password: organization.password,
      title: organization.title,
      cnpj: organization.cnpj.toString(),
      representativeName: organization.representativeName,
      profilePictureUrl: organization.profilePictureUrl,
      whatsapp: organization.whatsapp,
      telephoneNumber: organization.telephoneNumber,
      bio: organization.bio,
      pixKey: organization.pixKey,

      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    };
  }

  public static toDomain(raw: PrismaOrganization): Organization {
    return Organization.create(
      {
        username: raw.username,
        email: raw.email,
        password: raw.password,
        title: raw.title,
        cnpj: Cnpj.create(raw.cnpj),
        representativeName: raw.representativeName,
        whatsapp: raw.whatsapp,
        bio: raw.bio,
        pixKey: raw.pixKey,
        profilePictureUrl: raw.profilePictureUrl,
        telephoneNumber: raw.telephoneNumber,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }
}
