import { PostDetails } from '@Domain/social-network/enterprise/entities/value-objects/post-details';

import { CommentPresenter } from './comment-presenter';
import { MediaPresenter } from './media-presenter';
import { OrganizationPresenter } from './organization-presenter';

export class PostDetailsPresenter {
  public static toHTTP(post: PostDetails) {
    return {
      id: post.postID.toString(),
      textContent: post.textContent,
      likes: post.likes,
      medias: post.medias.map(MediaPresenter.toHTTP),
      comments: post.comments.map(CommentPresenter.withCreatorToHTTP),
      organization: OrganizationPresenter.toHTTP(post.organization),
      createdAt: post.createdAt,
    };
  }
}
