import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import {
  Follow,
  FollowProps,
} from '@Domain/social-network/enterprise/entities/follow';

export class FollowFactory {
  public static make(
    override: Partial<FollowProps> = {},
    id?: UniqueEntityID,
  ): Follow {
    const follow = Follow.create(
      {
        commonUserID: new UniqueEntityID(),
        organizationID: new UniqueEntityID(),
        ...override,
      },
      id,
    );

    return follow;
  }
}
