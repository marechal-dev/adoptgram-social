import { Injectable } from '@nestjs/common';

import { IncorrectEmailOrPasswordException } from '@Application/exceptions/incorrect-email-or-password';
import { UserRoleNotAllowedException } from '@Application/exceptions/user-role-not-allowed';
import { CommonUsersRepository } from '@Application/repositories/common-users-repository';
import { OrganizationsRepository } from '@Application/repositories/organizations-repository';

import { compare } from 'bcrypt';

export type AuthenticateUserUseCaseRequest = {
  email: string;
  password: string;
  kind: 'CommonUser' | 'Organization';
};

export type UserPayload = {
  id: string;
  username: string;
  email: string;
  kind: 'CommonUser' | 'Organization';
};

export type AuthenticateUserUseCaseResponse = {
  user: UserPayload;
};

@Injectable()
export class AuthenticateUserUseCase {
  public constructor(
    private readonly commonUsersRepository: CommonUsersRepository,
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  public async execute({
    email,
    password,
    kind,
  }: AuthenticateUserUseCaseRequest) {
    const user: UserPayload = {
      id: '',
      username: '',
      email: '',
      kind: 'CommonUser',
    };

    switch (kind) {
      case 'CommonUser':
        const commonUser = await this.commonUsersRepository.findByEmail(email);

        if (!commonUser) {
          throw new IncorrectEmailOrPasswordException();
        }

        if (!(await compare(password, commonUser.passwordHash))) {
          throw new IncorrectEmailOrPasswordException();
        }

        user.id = commonUser.id.toString();
        user.username = commonUser.username;
        user.email = commonUser.email;

        break;
      case 'Organization':
        const organization = await this.organizationsRepository.findByEmail(
          email,
        );

        if (!organization) {
          throw new IncorrectEmailOrPasswordException();
        }

        if (!(await compare(password, organization.passwordHash))) {
          throw new IncorrectEmailOrPasswordException();
        }

        user.id = organization.id.toString();
        user.username = organization.username;
        user.email = organization.email;
        user.kind = 'Organization';

        break;
      default:
        throw new UserRoleNotAllowedException('Tipo de usuário não autorizado');
    }

    return {
      user,
    };
  }
}
