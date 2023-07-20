import { PaginationParams } from '@Core/repositories/pagination-params';
import { CommonUser } from '@Domain/enterprise/entities/common-user';

export abstract class CommonUsersRepository {
  abstract create(commonUser: CommonUser): Promise<CommonUser>;
  abstract save(commonUser: CommonUser): Promise<CommonUser>;
  abstract delete(id: string): Promise<boolean>;
  abstract getMany(params: PaginationParams): Promise<CommonUser[]>;
  abstract findById(id: string): Promise<CommonUser | null>;
  abstract findByUsername(username: string): Promise<CommonUser | null>;
  abstract findByEmail(email: string): Promise<CommonUser | null>;
  abstract findByCpf(cpf: string): Promise<CommonUser | null>;
}
