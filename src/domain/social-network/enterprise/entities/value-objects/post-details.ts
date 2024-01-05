import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { ValueObject } from '@Core/entities/value-object';

import { Media } from '../media';
import { Organization } from '../organization';

import { CommentWithCreator } from './comment-with-creator';

export interface PostDetailsProps {
  postID: UniqueEntityID;
  organization: Organization;
  textContent: string;
  likes: number;
  medias: Media[];
  comments: CommentWithCreator[];
  createdAt: Date;
}

export class PostDetails extends ValueObject<PostDetailsProps> {
  public static create(props: PostDetailsProps) {
    return new PostDetails(props);
  }

  public get postID() {
    return this.props.postID;
  }

  public get organization() {
    return this.props.organization;
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

  public get comments() {
    return this.props.comments;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
