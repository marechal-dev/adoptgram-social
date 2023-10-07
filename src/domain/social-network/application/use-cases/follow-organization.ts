import { ResourceNotFoundException } from '@Core/exceptions/resource-not-found-exception';
import { Either, left, right } from '@Core/types/either';
import { Injectable } from '@nestjs/common';
import { CommonUsersRepository } from '../repositories/common-users-repository';
import { OrganizationsRepository } from '../repositories/organizations-repository';
import { OrganizationNotFoundException } from './exceptions/organization-not-found-exception';
import { CommonUserNotFoundException } from './exceptions/common-user-not-found-exception';
import { FollowsRepository } from '../repositories/follows-repository';
import { AlreadyFollowingOrganizationException } from './exceptions/already-following-organization-exception';
import { Follow } from '@Domain/social-network/enterprise/entities/follow';

interface FollowOrganizationUseCaseRequest {
  commonUserID: string;
  organizationID: string;
}

type FollowOrganizationUseCaseResponse = Either<
  ResourceNotFoundException | AlreadyFollowingOrganizationException,
  null
>;

@Injectable()
export class FollowOrganizationUseCase {
  public constructor(
    private readonly commonUsersRepository: CommonUsersRepository,
    private readonly organizationsRepository: OrganizationsRepository,
    private readonly followsRepository: FollowsRepository,
  ) {}

  public async execute({
    commonUserID,
    organizationID,
  }: FollowOrganizationUseCaseRequest): Promise<FollowOrganizationUseCaseResponse> {
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

    if (follow) {
      return left(new AlreadyFollowingOrganizationException());
    }

    const newFollow = Follow.create({
      commonUserID: commonUser.id,
      organizationID: organization.id,
    });

    await this.followsRepository.create(newFollow);

    return right(null);
  }
}
