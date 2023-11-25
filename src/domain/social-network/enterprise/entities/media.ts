import { Entity } from '@Core/entities/entity';
import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Optional } from '@Core/types/optional';

import { MediaType } from './enums/media-type';

export interface MediaProps {
  url: string;
  type: MediaType;
  postID: UniqueEntityID;
  createdAt: Date;
}

export class Media extends Entity<MediaProps> {
  public static create(
    props: Optional<MediaProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new Media(
      {
        url: props.url,
        postID: props.postID,
        type: props.type,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  public get url() {
    return this.props.url;
  }

  public get type() {
    return this.props.type;
  }

  public get postID() {
    return this.props.postID;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
