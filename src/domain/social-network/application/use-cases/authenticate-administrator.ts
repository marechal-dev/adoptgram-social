import { Either, left, right } from '@Core/types/either';
import { UserPayload } from '@Infra/auth/jwt-auth.guard';
import { Injectable } from '@nestjs/common';

import { Encrypter } from '../cryptography/encrypter';
import { HashComparer } from '../cryptography/hash-comparer';
import { AdministratorsRepository } from '../repositories/administrators-repository';

import { IncorrectCredentialsException } from './exceptions/incorrect-credentials-exception';

interface AuthenticateAdministratorUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateAdministratorUseCaseResponse = Either<
  IncorrectCredentialsException,
  {
    userID: string;
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateAdministratorUseCase {
  public constructor(
    private readonly administratorsRepository: AdministratorsRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  public async execute({
    email,
    password,
  }: AuthenticateAdministratorUseCaseRequest): Promise<AuthenticateAdministratorUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findByEmail(email);

    if (!administrator) {
      return left(new IncorrectCredentialsException());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      administrator.password,
    );

    if (!isPasswordValid) {
      return left(new IncorrectCredentialsException());
    }

    const userPayload: UserPayload = {
      sub: administrator.id.toString(),
      email: administrator.email,
      username: administrator.username,
      kind: 'Admin',
    };

    const accessToken = await this.encrypter.encrypt(userPayload);

    return right({
      userID: administrator.id.toString(),
      accessToken,
    });
  }
}
