import { Either, left, right } from '@Core/types/either';
import { Injectable } from '@nestjs/common';

import { PostsRepository } from '../repositories/posts-repository';

import { PostNotFoundException } from './exceptions/post-not-found-exception';

interface DeletePostUseCaseRequest {
  postID: string;
}

type DeletePostUseCaseResponse = Either<PostNotFoundException, null>;

@Injectable()
export class DeletePostUseCase {
  public constructor(private readonly postsRepository: PostsRepository) {}

  public async execute({
    postID,
  }: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
    const post = await this.postsRepository.findByID(postID);

    if (!post) {
      return left(new PostNotFoundException(postID));
    }

    await this.postsRepository.delete(postID);

    return right(null);
  }
}
