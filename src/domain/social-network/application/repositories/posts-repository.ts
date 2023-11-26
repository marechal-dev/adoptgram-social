import { Post } from '@Domain/social-network/enterprise/entities/post';
import { TimelinePost } from '@Domain/social-network/enterprise/entities/value-objects/timeline-post';

export abstract class PostsRepository {
  abstract create(post: Post): Promise<void>;
  abstract delete(postID: string): Promise<void>;
  abstract fetchManyRecent(): Promise<TimelinePost[]>;
  abstract findByID(id: string): Promise<Post | null>;
}
