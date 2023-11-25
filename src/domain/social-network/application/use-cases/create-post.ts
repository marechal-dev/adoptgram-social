import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Either, left, right } from '@Core/types/either';
import { Media } from '@Domain/social-network/enterprise/entities/media';
import { MediasList } from '@Domain/social-network/enterprise/entities/medias-list';
import { Post } from '@Domain/social-network/enterprise/entities/post';
import { Injectable } from '@nestjs/common';

import { PostsRepository } from '../repositories/posts-repository';

import { TooFewMediasException } from './exceptions/too-few-medias-exception';

interface MediaMetadata {
  url: string;
  type: 'Image' | 'Video';
}

interface CreatePostUseCaseRequest {
  textContent: string;
  organizationID: string;
  mediasMetadatas: MediaMetadata[];
}

type CreatePostUseCaseResponse = Either<
  TooFewMediasException,
  {
    post: Post;
  }
>;

@Injectable()
export class CreatePostUseCase {
  public constructor(private readonly postsRepository: PostsRepository) {}

  public async execute({
    textContent,
    organizationID,
    mediasMetadatas,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const notEnoughMedias = mediasMetadatas.length === 0;

    if (notEnoughMedias) {
      return left(new TooFewMediasException());
    }

    const post = Post.create({
      organizationID: new UniqueEntityID(organizationID),
      textContent,
    });

    const medias = mediasMetadatas.map((metadata) =>
      Media.create({
        postID: post.id,
        type: metadata.type,
        url: metadata.url,
      }),
    );

    const mediasList = new MediasList(medias);

    post.medias = mediasList;

    await this.postsRepository.create(post);

    return right({
      post,
    });
  }
}
