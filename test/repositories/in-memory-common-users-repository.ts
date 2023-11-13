import { FetchManyResult } from '@Core/repositories/fetch-many-result';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { CommonUsersRepository } from '@Domain/social-network/application/repositories/common-users-repository';
import { CommonUser } from '@Domain/social-network/enterprise/entities/common-user';

export class InMemoryCommonUsersRepository extends CommonUsersRepository {
  public items: CommonUser[] = [];

  public async create(commonUser: CommonUser): Promise<void> {
    this.items.push(commonUser);
  }

  public async fetchMany({
    page,
    pageSize,
  }: PaginationParams): Promise<FetchManyResult<CommonUser>> {
    const items = this.items.slice((page - 1) * pageSize, page * pageSize);

    return {
      totalCount: this.items.length,
      items,
    };
  }

  public async findById(id: string): Promise<CommonUser | null> {
    const commonUser = this.items.find((item) => item.id.toString() === id);

    if (!commonUser) {
      return null;
    }

    return commonUser;
  }

  public async findByUsername(username: string): Promise<CommonUser | null> {
    const commonUser = this.items.find((item) => item.username === username);

    if (!commonUser) {
      return null;
    }

    return commonUser;
  }

  public async findByEmail(email: string): Promise<CommonUser | null> {
    const commonUser = this.items.find((item) => item.email === email);

    if (!commonUser) {
      return null;
    }

    return commonUser;
  }

  public async findByCpf(cpf: string): Promise<CommonUser | null> {
    const commonUser = this.items.find((item) => item.cpf.toString() === cpf);

    if (!commonUser) {
      return null;
    }

    return commonUser;
  }

  public async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== id);
  }
}
