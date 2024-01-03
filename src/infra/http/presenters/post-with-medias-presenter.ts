import { PostWithMedias } from '@Domain/social-network/enterprise/entities/value-objects/post-with-medias';

import { MediaPresenter } from './media-presenter';

export class PostWithMediasPresenter {
  public static toHTTP(post: PostWithMedias) {
    return {
      id: post.postID.toString(),
      likes: post.likes,
      textContent: post.textContent,
      medias: post.medias.map(MediaPresenter.toHTTP),
      createdAt: post.createdAt,
    };
  }
}
