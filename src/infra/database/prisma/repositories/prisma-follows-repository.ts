import {
  AccountsIDsParams,
  FollowsRepository,
} from '@Domain/social-network/application/repositories/follows-repository';
import { Follow } from '@Domain/social-network/enterprise/entities/follow';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaFollowsRepository extends FollowsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(follow: Follow): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async findOneByAccountsIDs(
    accountsIDs: AccountsIDsParams,
  ): Promise<Follow | null> {
    throw new Error('Method not implemented.');
  }

  public async deleteOneByAccountsIDs(
    accountsIDs: AccountsIDsParams,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async findManyByOrganizationID(
    organizationID: string,
  ): Promise<Follow[]> {
    throw new Error('Method not implemented.');
  }

  public async findManyByCommonUserID(commonUserID: string): Promise<Follow[]> {
    throw new Error('Method not implemented.');
  }
}
