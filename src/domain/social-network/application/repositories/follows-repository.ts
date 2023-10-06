import { Follow } from '@Domain/social-network/enterprise/entities/follow';

type AccountsIDsParams = {
  commonUserID: string;
  organizationID: string;
};

export abstract class FollowsRepository {
  abstract create(follow: Follow): Promise<void>;
  abstract findOneByAccountsIDs(
    accountsIDs: AccountsIDsParams,
  ): Promise<Follow | null>;
  abstract deleteOneByAccountsIDs(
    accountsIDs: AccountsIDsParams,
  ): Promise<void>;
  abstract findManyByOrganizationID(organizationID: string): Promise<Follow[]>;
  abstract findManyByCommonUserID(commonUserID: string): Promise<Follow[]>;
}
