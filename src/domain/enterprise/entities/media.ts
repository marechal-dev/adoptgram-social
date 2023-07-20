import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { MediaType } from './enums/media-type';
import { Entity } from '@Core/entities/entity';

export interface MediaProps {
  url: string;
  type: MediaType;
  postId: UniqueEntityId;
}

export class Media extends Entity<MediaProps> {
  public static create(props: MediaProps, id?: UniqueEntityId) {
    return new Media(props, id);
  }

  public get url(): string {
    return this.props.url;
  }

  public get type(): MediaType {
    return this.props.type;
  }

  public get postId(): UniqueEntityId {
    return this.props.postId;
  }
}
