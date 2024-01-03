import { Post } from '@Domain/social-network/enterprise/entities/post';
import { PostWithMedias } from '@Domain/social-network/enterprise/entities/value-objects/post-with-medias';
import { TimelinePost } from '@Domain/social-network/enterprise/entities/value-objects/timeline-post';

export abstract class PostsRepository {
  abstract create(post: Post): Promise<void>;
  abstract delete(postID: string): Promise<void>;
  abstract fetchManyByOrganizationID(id: string): Promise<PostWithMedias[]>;
  abstract fetchManyRecent(): Promise<TimelinePost[]>;
  abstract findByID(id: string): Promise<Post | null>;
}
