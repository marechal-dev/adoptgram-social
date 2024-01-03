import { Either, left, right } from '@Core/types/either';
import { OrganizationDetails } from '@Domain/social-network/enterprise/entities/value-objects/organization-details';
import { Injectable } from '@nestjs/common';

import { OrganizationsRepository } from '../repositories/organizations-repository';

import { OrganizationNotFoundException } from './exceptions/organization-not-found-exception';

type FindOrganizationDetailsByIdUseCaseRequest = {
  username: string;
};

type FindOrganizationDetailsByIdUseCaseResponse = Either<
  OrganizationNotFoundException,
  {
    organizationDetails: OrganizationDetails;
  }
>;

@Injectable()
export class FindOrganizationDetailsByUsernameUseCase {
  public constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  public async execute({
    username,
  }: FindOrganizationDetailsByIdUseCaseRequest): Promise<FindOrganizationDetailsByIdUseCaseResponse> {
    const organizationDetails =
      await this.organizationsRepository.findDetailsByUsername(username);

    if (!organizationDetails) {
      return left(new OrganizationNotFoundException(username));
    }

    return right({
      organizationDetails,
    });
  }
}
