import { ResourceNotFoundException } from '@Core/exceptions/resource-not-found-exception';
import { Either, left, right } from '@Core/types/either';
import { Injectable } from '@nestjs/common';
import { CommonUsersRepository } from '../repositories/common-users-repository';
import { OrganizationsRepository } from '../repositories/organizations-repository';
import { OrganizationNotFoundException } from './exceptions/organization-not-found-exception';
import { CommonUserNotFoundException } from './exceptions/common-user-not-found-exception';
import { FollowsRepository } from '../repositories/follows-repository';
import { AlreadyUnfollowedOrganizationException } from './exceptions/already-unfollowed-organization-exception';

interface UnfollowOrganizationUseCaseRequest {
  commonUserID: string;
  organizationID: string;
}

type UnfollowOrganizationUseCaseResponse = Either<
  ResourceNotFoundException | AlreadyUnfollowedOrganizationException,
  null
>;

@Injectable()
export class UnfollowOrganizationUseCase {
  public constructor(
    private readonly commonUsersRepository: CommonUsersRepository,
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

    const commonUser = await this.commonUsersRepository.findById(commonUserID);

    if (!commonUser) {
      return left(new CommonUserNotFoundException(commonUserID));
    }

    const follow = await this.followsRepository.findOneByAccountsIDs({
      commonUserID,
      organizationID,
    });

    if (!follow) {
      return left(new AlreadyUnfollowedOrganizationException());
    }

    await this.followsRepository.deleteOneByAccountsIDs({
      commonUserID: commonUser.id.toString(),
      organizationID: organization.id.toString(),
    });

    return right(null);
  }
}
