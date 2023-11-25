import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Either, left, right } from '@Core/types/either';
import { Follow } from '@Domain/social-network/enterprise/entities/follow';
import { FollowID } from '@Domain/social-network/enterprise/entities/follow-id';
import { Injectable } from '@nestjs/common';

import { FollowsRepository } from '../repositories/follows-repository';
import { OrganizationsRepository } from '../repositories/organizations-repository';

import { AlreadyFollowingOrganizationException } from './exceptions/already-following-organization-exception';
import { OrganizationNotFoundException } from './exceptions/organization-not-found-exception';

interface FollowOrganizationUseCaseRequest {
  commonUserID: string;
  organizationID: string;
}

type FollowOrganizationUseCaseResponse = Either<
  OrganizationNotFoundException | AlreadyFollowingOrganizationException,
  null
>;

@Injectable()
export class FollowOrganizationUseCase {
  public constructor(
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

    const follow = await this.followsRepository.findOneByAccountsIDs({
      commonUserID,
      organizationID,
    });

    if (follow) {
      return left(new AlreadyFollowingOrganizationException());
    }

    const uniqueCommonUserID = new UniqueEntityID(commonUserID);
    const uniqueOrganizationID = new UniqueEntityID(organizationID);

    const newFollow = Follow.create(
      {
        commonUserID: uniqueCommonUserID,
        organizationID: uniqueOrganizationID,
      },
      new FollowID(uniqueCommonUserID, uniqueOrganizationID),
    );

    await this.followsRepository.create(newFollow);

    return right(null);
  }
}
