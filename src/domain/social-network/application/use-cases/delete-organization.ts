import { Either, left, right } from '@Core/types/either';
import { Injectable } from '@nestjs/common';

import { OrganizationsRepository } from '../repositories/organizations-repository';

import { OrganizationNotFoundException } from './exceptions/organization-not-found-exception';

interface DeleteOrganizationUseCaseRequest {
  organizationID: string;
}

type DeleteOrganizationUseCaseResponse = Either<
  OrganizationNotFoundException,
  null
>;

@Injectable()
export class DeleteOrganizationUseCase {
  public constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  public async execute({
    organizationID,
  }: DeleteOrganizationUseCaseRequest): Promise<DeleteOrganizationUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationID);

    if (!organization) {
      return left(new OrganizationNotFoundException(organizationID));
    }

    await this.organizationsRepository.delete(organizationID);

    return right(null);
  }
}
