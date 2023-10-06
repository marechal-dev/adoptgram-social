import { ResourceNotFoundException } from '@Core/exceptions/resource-not-found-exception';
import { Either, left, right } from '@Core/types/either';
import { Injectable } from '@nestjs/common';
import { CommonUsersRepository } from '../repositories/common-users-repository';
import { OrganizationsRepository } from '../repositories/organizations-repository';
import { OrganizationNotFoundException } from './exceptions/organization-not-found-exception';
import { CommonUserNotFoundException } from './exceptions/common-user-not-found-exception';
import { FollowsRepository } from '../repositories/follows-repository';
import { Follow } from '@Domain/social-network/enterprise/entities/follow';
import { UniqueEntityID } from '@Core/entities/unique-entity-id';

interface ToggleFollowOnOrganizationUseCaseRequest {
  commonUserID: string;
  organizationID: string;
}

type ToggleFollowOnOrganizationUseCaseResponse = Either<
  ResourceNotFoundException,
  {
    wasFollowing: boolean;
    isNowFollowing: boolean;
  }
>;

@Injectable()
export class ToggleFollowOnOrganizationUseCase {
  public constructor(
    private readonly commonUsersRepository: CommonUsersRepository,
    private readonly organizationsRepository: OrganizationsRepository,
    private readonly followsRepository: FollowsRepository,
  ) {}

  public async execute({
    commonUserID,
    organizationID,
  }: ToggleFollowOnOrganizationUseCaseRequest): Promise<ToggleFollowOnOrganizationUseCaseResponse> {
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
      const follow = Follow.create({
        commonUserID: new UniqueEntityID(commonUserID),
        organizationID: new UniqueEntityID(organizationID),
      });

      await this.followsRepository.create(follow);

      return right({
        isNowFollowing: true,
        wasFollowing: false,
      });
    }

    await this.followsRepository.deleteOneByAccountsIDs({
      commonUserID,
      organizationID,
    });

    return right({
      isNowFollowing: false,
      wasFollowing: true,
    });
  }
}
