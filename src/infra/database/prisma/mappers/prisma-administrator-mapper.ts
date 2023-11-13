import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Administrator } from '@Domain/social-network/enterprise/entities/administrator';
import { Prisma, Administrator as PrismaAdministrator } from '@prisma/client';

export class PrismaAdministratorMapper {
  public static toPrisma(
    administrator: Administrator,
  ): Prisma.AdministratorUncheckedCreateInput {
    return {
      id: administrator.id.toString(),
      username: administrator.username,
      email: administrator.email,
      password: administrator.password,
      name: administrator.name,
      createdAt: administrator.createdAt,
      updatedAt: administrator.updatedAt,
    };
  }

  public static toDomain(raw: PrismaAdministrator): Administrator {
    return Administrator.create(
      {
        username: raw.username,
        email: raw.email,
        password: raw.password,
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }
}
