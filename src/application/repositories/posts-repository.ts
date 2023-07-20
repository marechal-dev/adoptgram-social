import { Post } from '@Domain/enterprise/entities/post';

export abstract class PostsRepository {
  abstract create(post: Post): Promise<Post>;
  abstract save(post: Post): Promise<Post>;
  abstract getById(id: string): Promise<Post | null>;
  abstract fetchManyByOrganizationId(organizationId: string): Promise<Post[]>;
  abstract delete(post: Post): Promise<boolean>;
}
