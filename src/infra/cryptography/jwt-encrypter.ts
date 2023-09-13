import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Encrypter } from '@Domain/social-network/application/cryptography/encrypter';

@Injectable()
export class JwtEncrypter implements Encrypter {
  public constructor(private readonly jwtService: JwtService) {}

  public async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
