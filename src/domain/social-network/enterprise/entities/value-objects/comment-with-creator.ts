import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { ValueObject } from '@Core/entities/value-object';

import { CommonUser } from '../common-user';

export interface CommentWithCreatorProps {
  id: UniqueEntityID;
  postID: UniqueEntityID;
  content: string;
  creator: CommonUser;
  createdAt: Date;
}

export class CommentWithCreator extends ValueObject<CommentWithCreatorProps> {
  public static create(props: CommentWithCreatorProps) {
    return new CommentWithCreator({
      id: props.id,
      postID: props.postID,
      content: props.content,
      creator: props.creator,
      createdAt: props.createdAt,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get postID() {
    return this.props.postID;
  }

  public get content() {
    return this.props.content;
  }

  public get creator() {
    return this.props.creator;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
