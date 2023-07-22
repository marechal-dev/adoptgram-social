import { PaginationParams } from '@Core/repositories/pagination-params';
import { CommonUser } from '@Domain/enterprise/entities/common-user';
import { CommonUsersRepository } from '@Application/repositories/common-users-repository';

export class InMemoryCommonUsersRepository extends CommonUsersRepository {
  public readonly items: CommonUser[] = [];

  public async create(commonUser: CommonUser): Promise<CommonUser> {
    this.items.push(commonUser);

    return commonUser;
  }

  public async save(commonUser: CommonUser): Promise<CommonUser> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === commonUser.id.toString(),
    );

    if (index >= 0) {
      this.items[index] = commonUser;
    }

    return commonUser;
  }

  public async delete(id: string): Promise<boolean> {
    const index = this.items.findIndex((item) => item.id.toString() === id);

    if (index >= 0) {
      this.items.splice(index, 1);

      return true;
    }

    return false;
  }

  public async getMany({
    page,
    pageSize,
  }: PaginationParams): Promise<CommonUser[]> {
    return this.items.slice((page - 1) * pageSize, page * pageSize);
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
}
