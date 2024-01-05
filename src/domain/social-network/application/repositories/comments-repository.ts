import { Comment } from '@Domain/social-network/enterprise/entities/comment';
import { CommentWithCreator } from '@Domain/social-network/enterprise/entities/value-objects/comment-with-creator';

export abstract class CommentsRepository {
  abstract create(comment: Comment): Promise<void>;
  abstract findManyByPostID(postID: string): Promise<Comment[]>;
  abstract findManyWithCreatorByPostID(
    postID: string,
  ): Promise<CommentWithCreator[]>;
}
