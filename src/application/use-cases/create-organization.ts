import { Injectable } from '@nestjs/common';

import { hash } from 'bcrypt';

import { ResourceAlreadyExistsError } from '@Application/exceptions/resource-already-exists';
import { OrganizationsRepository } from '@Application/repositories/organizations-repository';
import { Organization } from '@Domain/enterprise/entities/organization';
import {
  Address,
  AddressProps,
} from '@Domain/enterprise/entities/value-objects/address';

export interface CreateOrganizationUseCaseRequest {
  username: string;
  email: string;
  password: string;
  title: string;
  bio?: string;
  representativeName: string;
  whatsapp: string;
  residentialPhone?: string;
  address: AddressProps;
  pixKey?: string;
}

export interface CreateOrganizationUseCaseResponse {
  profile: Organization;
}

@Injectable()
export class CreateOrganizationUseCase {
  public constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  public async execute({
    username,
    email,
    password,
    title,
    bio,
    representativeName,
    whatsapp,
    residentialPhone,
    address,
    pixKey,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const alreadyExistsByUsername =
      await this.organizationsRepository.findByUsername(username);
    if (alreadyExistsByUsername) {
      throw new ResourceAlreadyExistsError(
        `Usuário com apelido ${username} já cadastrado!`,
      );
    }

    const alreadyExistsByEmail =
      await this.organizationsRepository.findByUsername(username);
    if (alreadyExistsByEmail) {
      throw new ResourceAlreadyExistsError(
        `Usuário com e-amil ${email} já cadastrado!`,
      );
    }

    const HASHING_ROUNDS = 6;
    const passwordHash = await hash(password, HASHING_ROUNDS);
    const organization = Organization.create({
      username,
      email,
      passwordHash,
      title,
      bio,
      representativeName,
      whatsapp,
      residentialPhone,
      address: Address.create(address),
      pixKey,
    });

    await this.organizationsRepository.create(organization);

    return {
      profile: organization,
    };
  }
}
