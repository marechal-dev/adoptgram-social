import { PostsRepository } from '@Domain/social-network/application/repositories/posts-repository';
import { Post } from '@Domain/social-network/enterprise/entities/post';
import { InMemoryMediasRepository } from './in-memory-medias-repository';

export class InMemoryPostsRepository extends PostsRepository {
  public items: Post[] = [];

  public constructor(
    private readonly mediasRepository: InMemoryMediasRepository,
  ) {
    super();
  }

  public async create(post: Post): Promise<void> {
    this.items.push(post);

    await this.mediasRepository.createMany(post.medias.getItems());
  }

  public async delete(postID: string): Promise<void> {
    await this.mediasRepository.deleteManyByPostID(postID);

    this.items = this.items.filter((item) => item.id.toString() !== postID);
  }
}
