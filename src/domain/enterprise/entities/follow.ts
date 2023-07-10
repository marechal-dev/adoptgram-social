import { Entity } from '@Core/entities/entity';
import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { Optional } from '@Core/types/optional';

interface FollowProps {
  commonUserProfileId: UniqueEntityId;
  organizationProfileId: UniqueEntityId;
  followedAt: Date;
}

export class Follow extends Entity<FollowProps> {
  public static create(props: Optional<FollowProps, 'followedAt'>): Follow {
    const follow = new Follow({
      ...props,
      followedAt: props.followedAt ?? new Date(),
    });

    return follow;
  }

  public get commonUserProfileId(): UniqueEntityId {
    return this.props.commonUserProfileId;
  }

  public get organizationProfileId(): UniqueEntityId {
    return this.props.organizationProfileId;
  }

  public get followedAt(): Date {
    return this.props.followedAt;
  }
}
