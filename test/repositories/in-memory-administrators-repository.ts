import { AdministratorsRepository } from '@Domain/social-network/application/repositories/administrators-repository';
import { Administrator } from '@Domain/social-network/enterprise/entities/administrator';

export class InMemoryAdministratorsRepository extends AdministratorsRepository {
  public items: Administrator[] = [];

  public async findByEmail(email: string): Promise<Administrator | null> {
    const admin = this.items.find((item) => item.email === email);

    if (!admin) {
      return null;
    }

    return admin;
  }
}
