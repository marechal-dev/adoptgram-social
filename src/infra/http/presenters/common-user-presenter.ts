import { CommonUser } from '@Domain/social-network/enterprise/entities/common-user';

export class CommonUserPresenter {
  public static toHTTP(commonUser: CommonUser) {
    return {
      id: commonUser.id.toString(),
      name: commonUser.name,
      email: commonUser.email,
      createdAt: commonUser.createdAt,
      updatedAt: commonUser.updatedAt,
    };
  }
}
