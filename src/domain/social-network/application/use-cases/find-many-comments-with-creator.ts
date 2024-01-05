import { Either } from '@Core/types/either';
import { CommentWithCreator } from '@Domain/social-network/enterprise/entities/value-objects/comment-with-creator';
import { Injectable } from '@nestjs/common';

import { CommentsRepository } from '../repositories/comments-repository';
import { PostsRepository } from '../repositories/posts-repository';

import { PostNotFoundException } from './exceptions/post-not-found-exception';

type FindManyCommentsWithCreatorUseCaseRequest = {
  id: string;
};

type FindManyCommentsWithCreatorUseCaseResponse = Either<
  PostNotFoundException,
  {
    comments: CommentWithCreator[];
  }
>;

@Injectable()
export class FindManyCommentsWithCreatorUseCase {
  public constructor(
    private readonly postsRepository: PostsRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  public async execute({
    id,
  }: FindManyCommentsWithCreatorUseCaseRequest): Promise<FindManyCommentsWithCreatorUseCaseResponse> {
    const post = await this.postsRepository.findByID('');
  }
}
