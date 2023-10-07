import {
  AccountsIDsParams,
  FollowsRepository,
} from '@Domain/social-network/application/repositories/follows-repository';
import { Follow } from '@Domain/social-network/enterprise/entities/follow';

export class InMemoryFollowsRepository extends FollowsRepository {
  private readonly items: Follow[] = [];

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
    const itemIndex = this.items.findIndex(
      (item) =>
        item.commonUserID.toString() === commonUserID &&
        item.organizationID.toString() === organizationID,
    );

    if (itemIndex < 0) {
      return;
    }

    this.items.splice(itemIndex, 1);
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
