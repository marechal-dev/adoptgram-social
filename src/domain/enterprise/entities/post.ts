import { AuditableEntity } from '@Core/entities/auditable-entity';
import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { Optional } from '@Core/types/optional';
import { Comment } from './comment';
import { Media } from './media';

interface PostProps {
  creatorId: UniqueEntityId;
  likes: number;
  medias: Media[];
  comments: Comment[];
}

export class Post extends AuditableEntity<PostProps> {
  public static create(
    props: Optional<PostProps, 'medias' | 'comments'>,
    id?: UniqueEntityId,
  ) {
    return new Post(
      {
        ...props,
        medias: props.medias ?? [],
        comments: props.comments ?? [],
      },
      id,
    );
  }

  public get creatorId(): UniqueEntityId {
    return this.props.creatorId;
  }

  public get likes(): number {
    return this.props.likes;
  }

  public get medias(): Media[] {
    return this.props.medias;
  }

  public get comments(): Comment[] {
    return this.props.comments;
  }

  public like(): void {
    this.props.likes += 1;
    this.touch();
  }

  public comment(comment: Comment): void {
    this.props.comments.push(comment);
  }

  public addMedia(media: Media): void {
    this.props.medias.push(media);
  }
}
