import { PaginationParams } from '@Core/repositories/pagination-params';
import { CommonUser } from '@Domain/enterprise/entities/common-user';

export abstract class CommonUsersRepository {
  abstract create(commonUser: CommonUser): Promise<CommonUser>;
  abstract save(commonUser: CommonUser): Promise<CommonUser>;
  abstract delete(commonUser: CommonUser): Promise<boolean>;
  abstract getMany(params: PaginationParams): Promise<CommonUser[]>;
  abstract searchMany(query: string): Promise<CommonUser[]>;
  abstract findOneById(id: string): Promise<CommonUser | null>;
  abstract findOneByCpf(cpf: string): Promise<CommonUser | null>;
}
