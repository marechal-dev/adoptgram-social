import { Post } from '@Domain/social-network/enterprise/entities/post';

export abstract class PostsRepository {
  abstract create(post: Post): Promise<void>;
  abstract delete(postID: string): Promise<void>;
}
