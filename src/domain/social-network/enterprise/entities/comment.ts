import { Entity } from '@Core/entities/entity';
import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Optional } from '@Core/types/optional';

export type CommentProps = {
  creatorID: UniqueEntityID;
  postID: UniqueEntityID;
  content: string;
  createdAt: Date;
};

export class Comment extends Entity<CommentProps> {
  public static create(
    props: Optional<CommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new Comment(
      {
        creatorID: props.creatorID,
        postID: props.postID,
        content: props.content,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  public get creatorID() {
    return this.props.creatorID;
  }

  public get postID() {
    return this.props.postID;
  }

  public get content() {
    return this.props.content;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
