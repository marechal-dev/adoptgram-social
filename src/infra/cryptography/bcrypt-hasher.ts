import { HashComparer } from '@Domain/social-network/application/cryptography/hash-comparer';
import { HashGenerator } from '@Domain/social-network/application/cryptography/hash-generator';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  private readonly numberOfRounds = 10;

  public async hash(plain: string): Promise<string> {
    return hash(plain, this.numberOfRounds);
  }

  public async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
