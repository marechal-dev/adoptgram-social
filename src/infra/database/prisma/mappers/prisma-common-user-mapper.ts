import { Prisma, CommonUser as PrismaCommonUser } from '@prisma/client';
import { CommonUser } from '@Domain/social-network/enterprise/entities/common-user';
import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Cpf } from '@Domain/social-network/enterprise/entities/value-objects/cpf';

export class PrismaCommonUserMapper {
  public static toPrisma(
    commonUser: CommonUser,
  ): Prisma.CommonUserUncheckedCreateInput {
    return {
      id: commonUser.id.toString(),
      username: commonUser.username,
      email: commonUser.email,
      password: commonUser.password,
      name: commonUser.name,
      cpf: commonUser.cpf.value,
      createdAt: commonUser.createdAt,
      updatedAt: commonUser.updatedAt,
    };
  }

  public static toDomain(raw: PrismaCommonUser): CommonUser {
    return CommonUser.create(
      {
        username: raw.username,
        email: raw.email,
        password: raw.password,
        name: raw.name,
        cpf: Cpf.create(raw.cpf),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }
}
