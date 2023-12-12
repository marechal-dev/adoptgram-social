import { PostsRepository } from '@Domain/social-network/application/repositories/posts-repository';
import { Post } from '@Domain/social-network/enterprise/entities/post';
import { TimelinePost } from '@Domain/social-network/enterprise/entities/value-objects/timeline-post';
import { sub } from 'date-fns';

import { InMemoryMediasRepository } from './in-memory-medias-repository';
import { InMemoryOrganizationsRepository } from './in-memory-organizations-repository';

export class InMemoryPostsRepository extends PostsRepository {
  private readonly RECENT_TIMESPAN_IN_MINUTES = 20;

  public items: Post[] = [];

  public constructor(
    private readonly mediasRepository: InMemoryMediasRepository,
    private readonly organizationsRepository: InMemoryOrganizationsRepository,
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

  public async fetchManyRecent(): Promise<TimelinePost[]> {
    const now = new Date();
    const minutesAgo = sub(now, {
      minutes: this.RECENT_TIMESPAN_IN_MINUTES,
    });

    const posts = this.items
      .filter((item) => item.createdAt >= minutesAgo && item.createdAt <= now)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const timelinePosts = posts.map((post) => {
      const organization = this.organizationsRepository.items.find((org) =>
        org.id.equals(post.organizationID),
      );

      if (!organization) {
        throw new Error(
          `Organization ${post.organizationID.toString()} not found`,
        );
      }

      const medias = this.mediasRepository.items.filter((media) =>
        media.postID.equals(post.id),
      );

      return TimelinePost.create({
        postID: post.id,
        organization,
        medias,
        textContent: post.textContent,
        likes: post.likes,
        createdAt: post.createdAt,
      });
    });

    return timelinePosts;
  }

  public async findByID(id: string): Promise<Post | null> {
    const post = this.items.find((item) => item.id.toString() === id);

    if (!post) {
      return null;
    }

    return post;
  }
}
