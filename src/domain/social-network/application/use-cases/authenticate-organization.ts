import { Either, left, right } from '@Core/types/either';
import { UserPayload } from '@Infra/auth/jwt-auth.guard';
import { Injectable } from '@nestjs/common';
import { Encrypter } from '../cryptography/encrypter';
import { HashComparer } from '../cryptography/hash-comparer';
import { OrganizationsRepository } from '../repositories/organizations-repository';
import { IncorrectCredentialsException } from './exceptions/incorrect-credentials-exception';

interface AuthenticateOrganizationUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateOrganizationUseCaseResponse = Either<
  IncorrectCredentialsException,
  { accessToken: string; userID: string }
>;

@Injectable()
export class AuthenticateOrganizationUseCase {
  public constructor(
    private readonly organizationsRepository: OrganizationsRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  public async execute({
    email,
    password,
  }: AuthenticateOrganizationUseCaseRequest): Promise<AuthenticateOrganizationUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) {
      return left(new IncorrectCredentialsException());
    }

    const passwordsMatch = await this.hashComparer.compare(
      password,
      organization.password,
    );

    if (!passwordsMatch) {
      return left(new IncorrectCredentialsException());
    }

    const userPayload: UserPayload = {
      sub: organization.id.toString(),
      email: organization.email,
      username: organization.username,
      kind: 'Organization',
    };

    const accessToken = await this.encrypter.encrypt(userPayload);

    return right({
      userID: organization.id.toString(),
      accessToken,
    });
  }
}
