import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { ValueObject } from '@Core/entities/value-object';

import { Media } from '../media';

export interface PostWithMediasProps {
  postID: UniqueEntityID;
  textContent: string;
  likes: number;
  medias: Media[];
  createdAt: Date;
}

export class PostWithMedias extends ValueObject<PostWithMediasProps> {
  public static create(props: PostWithMediasProps) {
    return new PostWithMedias(props);
  }

  public get postID() {
    return this.props.postID;
  }

  public get textContent() {
    return this.props.textContent;
  }

  public get likes() {
    return this.props.likes;
  }

  public get medias() {
    return this.props.medias;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
