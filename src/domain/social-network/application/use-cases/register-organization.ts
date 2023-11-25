import { Either, left, right } from '@Core/types/either';
import { InvalidCnpjException } from '@Domain/social-network/enterprise/entities/exceptions/invalid-cnpj';
import { Organization } from '@Domain/social-network/enterprise/entities/organization';
import { Cnpj } from '@Domain/social-network/enterprise/entities/value-objects/cnpj';
import { Injectable } from '@nestjs/common';

import { HashGenerator } from '../cryptography/hash-generator';
import { OrganizationsRepository } from '../repositories/organizations-repository';

import { OrganizationAlreadyExistsException } from './exceptions/organization-already-exists-exception';

interface RegisterOrganizationUseCaseRequest {
  username: string;
  email: string;
  password: string;
  title: string;
  representativeName: string;
  cnpj: string;
  whatsapp: string;
  city: string;
  state: string;
  telephoneNumber?: string | null;
  pixKey?: string | null;
}

type RegisterOrganizationUseCaseResponse = Either<
  InvalidCnpjException | OrganizationAlreadyExistsException,
  {
    organization: Organization;
  }
>;

@Injectable()
export class RegisterOrganizationUseCase {
  public constructor(
    private readonly organizationsRepository: OrganizationsRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  public async execute({
    username,
    email,
    password,
    title,
    representativeName,
    cnpj,
    whatsapp,
    telephoneNumber,
    pixKey,
    city,
    state,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    // Before taking 3 round-trips to the Database, validate the CNPJ
    const cnpjResult = Cnpj.createFromText(cnpj);

    if (cnpjResult.isLeft()) {
      return left(cnpjResult.value);
    }

    // Ok, now we can check on the database
    const [
      organizationWithSameCnpj,
      organizationWithSameEmail,
      organizationWithSameUsername,
    ] = await Promise.all([
      this.organizationsRepository.findByCnpj(cnpj),
      this.organizationsRepository.findByEmail(email),
      this.organizationsRepository.findByUsername(username),
    ]);

    if (organizationWithSameCnpj) {
      return left(new OrganizationAlreadyExistsException(cnpj));
    }

    if (organizationWithSameEmail) {
      return left(new OrganizationAlreadyExistsException(email));
    }

    if (organizationWithSameUsername) {
      return left(new OrganizationAlreadyExistsException(username));
    }

    const passwordHash = await this.hashGenerator.hash(password);

    const organization = Organization.create({
      username,
      email,
      password: passwordHash,
      title,
      representativeName,
      cnpj: cnpjResult.value,
      whatsapp,
      telephoneNumber,
      pixKey,
      city,
      state,
    });

    await this.organizationsRepository.create(organization);

    return right({
      organization,
    });
  }
}
