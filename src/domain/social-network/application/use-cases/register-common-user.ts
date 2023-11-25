import { Either, left, right } from '@Core/types/either';
import { CommonUser } from '@Domain/social-network/enterprise/entities/common-user';
import { InvalidCpfException } from '@Domain/social-network/enterprise/entities/exceptions/invalid-cpf';
import { Cpf } from '@Domain/social-network/enterprise/entities/value-objects/cpf';
import { Injectable } from '@nestjs/common';

import { HashGenerator } from '../cryptography/hash-generator';
import { CommonUsersRepository } from '../repositories/common-users-repository';

import { CommonUserAlreadyExistsException } from './exceptions/common-user-already-exists';

interface RegisterCommonUserUseCaseRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  cpf: string;
}

type RegisterCommonUserUseCaseResponse = Either<
  InvalidCpfException | CommonUserAlreadyExistsException,
  {
    user: CommonUser;
  }
>;

@Injectable()
export class RegisterCommonUserUseCase {
  public constructor(
    private readonly commonUsersRepository: CommonUsersRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  public async execute({
    username,
    email,
    password,
    name,
    cpf,
  }: RegisterCommonUserUseCaseRequest): Promise<RegisterCommonUserUseCaseResponse> {
    // Before taking 3 round-trips to the Database, validate the CPF
    const cpfResult = Cpf.createFromText(cpf);

    if (cpfResult.isLeft()) {
      return left(cpfResult.value);
    }

    // Ok, now we can check on the database
    const [
      commonUserWithSameCpf,
      commonUserWithSameEmail,
      commonUserWithSameUsername,
    ] = await Promise.all([
      this.commonUsersRepository.findByCpf(cpf),
      this.commonUsersRepository.findByEmail(email),
      this.commonUsersRepository.findByUsername(username),
    ]);

    if (commonUserWithSameCpf) {
      return left(new CommonUserAlreadyExistsException(cpf));
    }

    if (commonUserWithSameEmail) {
      return left(new CommonUserAlreadyExistsException(email));
    }

    if (commonUserWithSameUsername) {
      return left(new CommonUserAlreadyExistsException(username));
    }

    const passwordHash = await this.hashGenerator.hash(password);

    const user = CommonUser.create({
      username,
      email,
      password: passwordHash,
      name,
      cpf: cpfResult.value,
    });

    await this.commonUsersRepository.create(user);

    return right({
      user,
    });
  }
}
