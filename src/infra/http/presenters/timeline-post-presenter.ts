import { TimelinePost } from '@Domain/social-network/enterprise/entities/value-objects/timeline-post';

import { MediaPresenter } from './media-presenter';
import { OrganizationPresenter } from './organization-presenter';

export class TimelinePostPresenter {
  public static toHTTP(timelinePost: TimelinePost) {
    return {
      id: timelinePost.postID.toString(),
      organization: OrganizationPresenter.toHTTP(timelinePost.organization),
      medias: timelinePost.medias.map(MediaPresenter.toHTTP),
      textContent: timelinePost.textContent,
      likes: timelinePost.likes,
      createdAt: timelinePost.createdAt,
    };
  }
}
