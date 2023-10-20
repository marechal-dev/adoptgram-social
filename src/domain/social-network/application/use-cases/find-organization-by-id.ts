import { Either, left, right } from '@Core/types/either';
import { Organization } from '@Domain/social-network/enterprise/entities/organization';
import { Injectable } from '@nestjs/common';
import { OrganizationsRepository } from '../repositories/organizations-repository';
import { OrganizationNotFoundException } from './exceptions/organization-not-found-exception';

interface FindOrganizationByIdUseCaseRequest {
  organizationID: string;
}

type FindOrganizationByIdUseCaseResponse = Either<
  OrganizationNotFoundException,
  {
    organization: Organization;
  }
>;

@Injectable()
export class FindOrganizationByIdUseCase {
  public constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  public async execute({
    organizationID,
  }: FindOrganizationByIdUseCaseRequest): Promise<FindOrganizationByIdUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationID);

    if (!organization) {
      return left(new OrganizationNotFoundException(organizationID));
    }

    return right({
      organization,
    });
  }
}
