import { Prisma, Organization as RawOrganization } from '@prisma/client';
import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { Organization } from '@Domain/enterprise/entities/organization';
import { Address } from '@Domain/enterprise/entities/value-objects/address';

type RawOrganizationWithAddress = Prisma.OrganizationGetPayload<{
  include: {
    address: true;
  };
}>;

export class PrismaOrganizationMapper {
  public static toDomain(raw: RawOrganizationWithAddress): Organization {
    return Organization.create(
      {
        ...raw,
        bio: raw.bio ?? undefined,
        pixKey: raw.pixKey ?? undefined,
        address: Address.create(
          {
            ...raw.address!,
            secondLine: raw.address!.secondLine,
          },
          new UniqueEntityId(raw.address!.id),
        ),
        profilePictureUrl: raw.profilePictureUrl ?? undefined,
      },
      new UniqueEntityId(raw.id),
      raw.createdAt,
      raw.updatedAt ?? undefined,
    );
  }
  public static toPrisma(organization: Organization): RawOrganization {
    return {
      id: organization.id.toString(),
      username: organization.username,
      email: organization.email,
      passwordHash: organization.passwordHash,
      title: organization.title,
      bio: organization.bio ?? null,
      pixKey: organization.pixKey ?? null,
      representativeName: organization.representativeName,
      whatsapp: organization.whatsapp,
      residentialNumber: organization.residentialPhone ?? null,
      profilePictureUrl: organization.profilePictureUrl ?? null,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt ?? null,
    };
  }
}
