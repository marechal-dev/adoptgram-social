import { FetchManyResult } from '@Core/repositories/fetch-many-result';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { CommonUser } from '@Domain/social-network/enterprise/entities/common-user';

export abstract class CommonUsersRepository {
  abstract create(commonUser: CommonUser): Promise<void>;
  abstract fetchMany(
    paginationParams: PaginationParams,
  ): Promise<FetchManyResult<CommonUser>>;
  abstract findById(id: string): Promise<CommonUser | null>;
  abstract findByUsername(username: string): Promise<CommonUser | null>;
  abstract findByEmail(email: string): Promise<CommonUser | null>;
  abstract findByCpf(cpf: string): Promise<CommonUser | null>;
  abstract delete(id: string): Promise<void>;
}
