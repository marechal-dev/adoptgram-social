import { AuditableEntity } from '@Core/entities/auditable-entity';
import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';

export interface CommentProps {
  content: string;
  commenterId: UniqueEntityId;
  postId: UniqueEntityId;
}

export class Comment extends AuditableEntity<CommentProps> {
  public static create(props: CommentProps, id?: UniqueEntityId) {
    return new Comment(props, id);
  }

  public get content(): string {
    return this.props.content;
  }

  public get commenterId(): UniqueEntityId {
    return this.props.commenterId;
  }

  public get postId(): UniqueEntityId {
    return this.props.postId;
  }
}
