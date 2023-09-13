import { Injectable } from '@nestjs/common';
import { CommonUsersRepository } from '../repositories/common-users-repository';
import { HashComparer } from '../cryptography/hash-comparer';
import { Encrypter } from '../cryptography/encrypter';
import { Either, left, right } from '@Core/types/either';
import { IncorrectCredentialsException } from './exceptions/incorrect-credentials-exception';
import { UserPayload } from '@Infra/auth/jwt-auth.guard';

interface AuthenticateCommonUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateCommonUserUseCaseResponse = Either<
  IncorrectCredentialsException,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateCommonUserUseCase {
  public constructor(
    private readonly commonUsersRepository: CommonUsersRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  public async execute({
    email,
    password,
  }: AuthenticateCommonUserUseCaseRequest): Promise<AuthenticateCommonUserUseCaseResponse> {
    const commonUser = await this.commonUsersRepository.findByEmail(email);

    if (!commonUser) {
      return left(new IncorrectCredentialsException());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      commonUser.password,
    );

    if (!isPasswordValid) {
      return left(new IncorrectCredentialsException());
    }

    const userPayload: UserPayload = {
      sub: commonUser.id.toString(),
      email: commonUser.email,
      username: commonUser.username,
      kind: 'CommonUser',
    };

    const accessToken = await this.encrypter.encrypt(userPayload);

    return right({
      accessToken,
    });
  }
}
