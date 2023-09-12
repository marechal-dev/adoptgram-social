import { CommonUser } from '@Domain/social-network/enterprise/entities/common-user';
import { CommonUsersRepository } from '@Domain/social-network/application/repositories/common-users-repository';

export class InMemoryCommonUsersRepository extends CommonUsersRepository {
  public items: CommonUser[] = [];

  public async create(commonUser: CommonUser): Promise<void> {
    this.items.push(commonUser);
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
