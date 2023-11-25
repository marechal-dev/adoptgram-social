import { UniqueEntityID } from '@Core/entities/unique-entity-id';
import { Either, right } from '@Core/types/either';
import { Media } from '@Domain/social-network/enterprise/entities/media';
import { MediasList } from '@Domain/social-network/enterprise/entities/medias-list';
import { Post } from '@Domain/social-network/enterprise/entities/post';
import { PostsRepository } from '../repositories/posts-repository';

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
  null,
  {
    post: Post;
  }
>;

export class CreatePostUseCase {
  public constructor(private readonly postsRepository: PostsRepository) {}

  public async execute({
    textContent,
    organizationID,
    mediasMetadatas,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
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
