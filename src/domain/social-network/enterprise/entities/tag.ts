import { Entity } from '@Core/entities/entity';
import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { TagID } from './tag-id';

export interface TagProps {
  postID: UniqueEntityID;
  petID: UniqueEntityID;
}

export class Tag extends Entity<TagProps> {
  public static create(props: TagProps, id: TagID) {
    const tag = new Tag(
      {
        postID: props.postID,
        petID: props.petID,
      },
      id,
    );

    return tag;
  }

  public get postID() {
    return this.props.postID;
  }

  public get petID() {
    return this.props.petID;
  }
}
