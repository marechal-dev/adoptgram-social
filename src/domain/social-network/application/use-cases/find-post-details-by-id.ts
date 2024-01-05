import { Either, left, right } from '@Core/types/either';
import { PostDetails } from '@Domain/social-network/enterprise/entities/value-objects/post-details';
import { Injectable } from '@nestjs/common';

import { PostsRepository } from '../repositories/posts-repository';

import { PostNotFoundException } from './exceptions/post-not-found-exception';

type FindPostDetailsByIdUseCaseRequest = {
  id: string;
};

type FindPostDetailsByIdUseCaseResponse = Either<
  PostNotFoundException,
  {
    post: PostDetails;
  }
>;

@Injectable()
export class FindPostDetailsByIdUseCase {
  public constructor(private readonly postsRepository: PostsRepository) {}

  public async execute({
    id,
  }: FindPostDetailsByIdUseCaseRequest): Promise<FindPostDetailsByIdUseCaseResponse> {
    const post = await this.postsRepository.findDetailsByID(id);

    if (!post) {
      return left(new PostNotFoundException(id));
    }

    return right({
      post,
    });
  }
}
