import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Either, left, right } from '@Core/types/either';
import { Comment } from '@Domain/social-network/enterprise/entities/comment';
import { Injectable } from '@nestjs/common';

import { CommentsRepository } from '../repositories/comments-repository';
import { CommonUsersRepository } from '../repositories/common-users-repository';
import { PostsRepository } from '../repositories/posts-repository';

import { CommonUserNotFoundException } from './exceptions/common-user-not-found-exception';
import { PostNotFoundException } from './exceptions/post-not-found-exception';

type CreateCommentUseCaseRequest = {
  postID: string;
  creatorID: string;
  content: string;
};

type CreateCommentUseCaseResponse = Either<
  CommonUserNotFoundException | PostNotFoundException,
  {
    comment: Comment;
  }
>;

@Injectable()
export class CreateCommentUseCase {
  public constructor(
    private readonly postsRepository: PostsRepository,
    private readonly commonUsersRepository: CommonUsersRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  public async execute({
    postID,
    creatorID,
    content,
  }: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
    const post = await this.postsRepository.findByID(postID);

    if (!post) {
      return left(new PostNotFoundException(postID));
    }

    const creator = await this.commonUsersRepository.findById(creatorID);

    if (!creator) {
      return left(new CommonUserNotFoundException(creatorID));
    }

    const comment = Comment.create({
      postID: new UniqueEntityID(postID),
      creatorID: new UniqueEntityID(creatorID),
      content,
    });

    await this.commentsRepository.create(comment);

    return right({
      comment,
    });
  }
}
