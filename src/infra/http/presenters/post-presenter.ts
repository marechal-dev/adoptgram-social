import { Post } from '@Domain/social-network/enterprise/entities/post';

import { MediaPresenter } from './media-presenter';

export class PostPresenter {
  public static toHTTP(post: Post) {
    return {
      id: post.id.toString(),
      textContent: post.textContent,
      medias: post.medias.getItems().map(MediaPresenter.toHTTP),
      likes: post.likes,
      createdAt: post.createdAt,
    };
  }
}
