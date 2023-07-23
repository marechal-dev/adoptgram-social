import { CommonUser as RawCommonUser } from '@prisma/client';
import { CommonUser } from '@Domain/enterprise/entities/common-user';
import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { Cpf } from '@Domain/enterprise/entities/value-objects/cpf';

export class PrismaCommonUserMapper {
  public static toDomain(raw: RawCommonUser): CommonUser {
    return CommonUser.create(
      {
        ...raw,
        cpf: Cpf.createFromText(raw.cpf),
        profilePictureUrl: raw.profilePictureUrl ?? undefined,
      },
      new UniqueEntityId(raw.id),
      raw.createdAt,
      raw.updatedAt ?? undefined,
    );
  }
  public static toPrisma(commonUser: CommonUser): RawCommonUser {
    return {
      id: commonUser.id.toString(),
      username: commonUser.username,
      email: commonUser.email,
      passwordHash: commonUser.passwordHash,
      firstName: commonUser.firstName,
      surname: commonUser.surname,
      cpf: commonUser.cpf.toString(),
      profilePictureUrl: commonUser.profilePictureUrl ?? null,
      createdAt: commonUser.createdAt,
      updatedAt: commonUser.updatedAt ?? null,
    };
  }
}
