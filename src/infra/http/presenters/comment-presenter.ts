import { Comment } from '@Domain/social-network/enterprise/entities/comment';
import { CommentWithCreator } from '@Domain/social-network/enterprise/entities/value-objects/comment-with-creator';

import { CommonUserPresenter } from './common-user-presenter';

export class CommentPresenter {
  public static toHTTP(comment: Comment) {
    return {
      id: comment.id.toString(),
      postID: comment.postID.toString(),
      creatorID: comment.creatorID.toString(),
      content: comment.content,
      createdAt: comment.createdAt,
    };
  }

  public static withCreatorToHTTP(comment: CommentWithCreator) {
    return {
      id: comment.id.toString(),
      postID: comment.postID.toString(),
      creator: CommonUserPresenter.toHTTP(comment.creator),
      content: comment.content,
      createdAt: comment.createdAt,
    };
  }
}
