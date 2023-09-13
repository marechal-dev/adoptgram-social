import { Injectable } from '@nestjs/common';
import { OrganizationsRepository } from '../repositories/organizations-repository';
import { Either, left, right } from '@Core/types/either';
import { IncorrectCredentialsException } from './exceptions/incorrect-credentials-exception';
import { HashComparer } from '../cryptography/hash-comparer';
import { Encrypter } from '../cryptography/encrypter';
import { UserPayload } from '@Infra/auth/jwt-auth.guard';

interface AuthenticateOrganizationUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateOrganizationUseCaseResponse = Either<
  IncorrectCredentialsException,
  { accessToken: string }
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
      accessToken,
    });
  }
}
