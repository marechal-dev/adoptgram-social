import { Encrypter } from '@Domain/social-network/application/cryptography/encrypter';

export class FakeEncrypter implements Encrypter {
  public async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
