import { Injectable } from '@nestjs/common';

import { hash } from 'bcrypt';

import { Cpf } from '@Domain/enterprise/entities/value-objects/cpf';
import { CommonUser } from '@Domain/enterprise/entities/common-user';
import { CommonUsersRepository } from '@Application/repositories/common-users-repository';
import { ResourceAlreadyExistsException } from '@Application/exceptions/resource-already-exists';

export interface CreateCommonUserUseCaseRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  surname: string;
  cpf: string;
}

export interface CreateCommonUserUseCaseResponse {
  profile: CommonUser;
}

@Injectable()
export class CreateCommonUserUseCase {
  public constructor(
    private readonly commonUsersRepository: CommonUsersRepository,
  ) {}

  public async execute({
    username,
    email,
    password,
    firstName,
    surname,
    cpf,
  }: CreateCommonUserUseCaseRequest): Promise<CreateCommonUserUseCaseResponse> {
    const alreadyExistsByUsername =
      await this.commonUsersRepository.findByUsername(username);
    if (alreadyExistsByUsername) {
      throw new ResourceAlreadyExistsException(
        `Usuário com apelido ${username} já cadastrado!`,
      );
    }

    const alreadyExistsByEmail = await this.commonUsersRepository.findByEmail(
      email,
    );
    if (alreadyExistsByEmail) {
      throw new ResourceAlreadyExistsException(
        `Usuário com e-mail ${email} já cadastrado!`,
      );
    }

    const alreadyExistsByCpf = await this.commonUsersRepository.findByCpf(cpf);
    if (alreadyExistsByCpf) {
      throw new ResourceAlreadyExistsException(
        `Usuário com CPF fornecido já cadastrado!`,
      );
    }

    const HASHING_ROUNDS = 6;
    const passwordHash = await hash(password, HASHING_ROUNDS);
    const commonUser = CommonUser.create({
      username,
      email,
      passwordHash,
      firstName,
      surname,
      cpf: Cpf.createFromText(cpf),
    });

    await this.commonUsersRepository.create(commonUser);

    return {
      profile: commonUser,
    };
  }
}
