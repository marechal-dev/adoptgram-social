import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { ValueObject } from '@Core/entities/value-object';

import { Media } from '../media';
import { Organization } from '../organization';

export interface TimelinePostProps {
  postID: UniqueEntityID;
  organization: Organization;
  textContent: string;
  likes: number;
  medias: Media[];
  createdAt: Date;
}

export class TimelinePost extends ValueObject<TimelinePostProps> {
  public static create(props: TimelinePostProps) {
    return new TimelinePost(props);
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

  public get createdAt() {
    return this.props.createdAt;
  }
}
