import { Entity } from '@Core/entities/entity';
import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Optional } from '@Core/types/optional';
import { MediasList } from './medias-list';

export interface PostProps {
  organizationID: UniqueEntityID;
  textContent: string;
  medias: MediasList;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Post extends Entity<PostProps> {
  public static create(
    props: Optional<PostProps, 'medias' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const post = new Post(
      {
        organizationID: props.organizationID,
        medias: props.medias ?? new MediasList(),
        textContent: props.textContent,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt,
      },
      id,
    );

    return post;
  }

  public get organizationID() {
    return this.props.organizationID;
  }

  public get medias() {
    return this.props.medias;
  }

  public get textContent() {
    return this.props.textContent;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
