import { CommentsRepository } from '@Domain/social-network/application/repositories/comments-repository';
import { Comment } from '@Domain/social-network/enterprise/entities/comment';
import { CommentWithCreator } from '@Domain/social-network/enterprise/entities/value-objects/comment-with-creator';

import { InMemoryCommonUsersRepository } from './in-memory-common-users-repository';

export class InMemoryCommentsRepository extends CommentsRepository {
  public items: Comment[] = [];

  public constructor(
    private readonly commonUsersRepository: InMemoryCommonUsersRepository,
  ) {
    super();
  }

  public async create(comment: Comment): Promise<void> {
    this.items.push(comment);
  }

  public async findManyByPostID(postID: string): Promise<Comment[]> {
    return this.items.filter((item) => item.postID.toString() === postID);
  }

  public async findManyWithCreatorByPostID(
    postID: string,
  ): Promise<CommentWithCreator[]> {
    const comments = this.items.filter(
      (item) => item.postID.toString() === postID,
    );

    const commentsWithAuthors = comments.map((comment) => {
      const creator = this.commonUsersRepository.items.find((user) =>
        user.id.equals(comment.creatorID),
      );

      if (!creator) {
        throw new Error(`User ${comment.creatorID.toString()} not found`);
      }

      return CommentWithCreator.create({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        creator,
        postID: comment.postID,
      });
    });

    return commentsWithAuthors;
  }
}
