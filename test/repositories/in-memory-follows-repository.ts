import {
  AccountsIDsParams,
  FollowsRepository,
} from '@Domain/social-network/application/repositories/follows-repository';
import { Follow } from '@Domain/social-network/enterprise/entities/follow';

export class InMemoryFollowsRepository extends FollowsRepository {
  public items: Follow[] = [];

  public async create(follow: Follow): Promise<void> {
    this.items.push(follow);
  }

  public async findOneByAccountsIDs({
    commonUserID,
    organizationID,
  }: AccountsIDsParams): Promise<Follow | null> {
    const follow = this.items.find(
      (item) =>
        item.commonUserID.toString() === commonUserID &&
        item.organizationID.toString() === organizationID,
    );

    if (!follow) {
      return null;
    }

    return follow;
  }

  public async deleteOneByAccountsIDs({
    commonUserID,
    organizationID,
  }: AccountsIDsParams): Promise<void> {
    this.items = this.items.filter(
      (item) =>
        item.commonUserID.toString() !== commonUserID &&
        item.organizationID.toString() !== organizationID,
    );
  }

  public async findManyByOrganizationID(
    organizationID: string,
  ): Promise<Follow[]> {
    return this.items.filter(
      (item) => item.organizationID.toString() === organizationID,
    );
  }

  public async findManyByCommonUserID(commonUserID: string): Promise<Follow[]> {
    return this.items.filter(
      (item) => item.commonUserID.toString() === commonUserID,
    );
  }
}
