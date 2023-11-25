import { Media } from '@Domain/social-network/enterprise/entities/media';

export abstract class MediasRepository {
  abstract createMany(medias: Media[]): Promise<void>;
  abstract deleteMany(medias: Media[]): Promise<void>;

  abstract findManyByPostID(postID: string): Promise<Media[]>;
  abstract deleteManyByPostID(postID: string): Promise<void>;
}
