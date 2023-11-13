import { Administrator } from '@Domain/social-network/enterprise/entities/administrator';

export abstract class AdministratorsRepository {
  abstract findByEmail(email: string): Promise<Administrator | null>;
}
