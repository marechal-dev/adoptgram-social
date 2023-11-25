import { Either, left, right } from '@Core/types/either';
import { Injectable } from '@nestjs/common';

import { FollowsRepository } from '../repositories/follows-repository';
import { OrganizationsRepository } from '../repositories/organizations-repository';

import { NotFollowingOrganizationException } from './exceptions/not-following-organization-exception';
import { OrganizationNotFoundException } from './exceptions/organization-not-found-exception';

interface UnfollowOrganizationUseCaseRequest {
  commonUserID: string;
  organizationID: string;
}

type UnfollowOrganizationUseCaseResponse = Either<
  OrganizationNotFoundException | NotFollowingOrganizationException,
  null
>;

@Injectable()
export class UnfollowOrganizationUseCase {
  public constructor(
    private readonly organizationsRepository: OrganizationsRepository,
    private readonly followsRepository: FollowsRepository,
  ) {}

  public async execute({
    commonUserID,
    organizationID,
  }: UnfollowOrganizationUseCaseRequest): Promise<UnfollowOrganizationUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationID);

    if (!organization) {
      return left(new OrganizationNotFoundException(organizationID));
    }

    const follow = await this.followsRepository.findOneByAccountsIDs({
      commonUserID,
      organizationID,
    });

    if (!follow) {
      return left(new NotFollowingOrganizationException());
    }

    await this.followsRepository.deleteOneByAccountsIDs({
      commonUserID,
      organizationID: organization.id.toString(),
    });

    return right(null);
  }
}
