import { Post } from '@Domain/social-network/enterprise/entities/post';

import { MediaPresenter } from './media-presenter';

export class PostPresenter {
  public static toHTTP(post: Post) {
    return {
      id: post.id.toString(),
      textContent: post.textContent,
      likes: post.likes,
      createdAt: post.createdAt,
    };
  }

  public static toHttpWithMedias(post: Post) {
    return {
      id: post.id.toString(),
      textContent: post.textContent,
      likes: post.likes,
      medias: post.medias.getItems().map(MediaPresenter.toHTTP),
      createdAt: post.createdAt,
    };
  }
}
