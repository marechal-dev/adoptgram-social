import { Entity } from '@Core/entities/entity';
import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Optional } from '@Core/types/optional';

export interface FollowProps {
  commonUserID: UniqueEntityID;
  organizationID: UniqueEntityID;
  createdAt: Date;
}

export class Follow extends Entity<FollowProps> {
  public static create(
    props: Optional<FollowProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const follow = new Follow(
      {
        commonUserID: props.commonUserID,
        organizationID: props.organizationID,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return follow;
  }

  public get commonUserID() {
    return this.props.commonUserID;
  }

  public get organizationID() {
    return this.props.organizationID;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
