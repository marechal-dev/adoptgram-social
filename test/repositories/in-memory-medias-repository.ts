import { MediasRepository } from '@Domain/social-network/application/repositories/medias-repository';
import { Media } from '@Domain/social-network/enterprise/entities/media';

export class InMemoryMediasRepository extends MediasRepository {
  public items: Media[] = [];

  public async createMany(medias: Media[]): Promise<void> {
    this.items.push(...medias);
  }

  public async deleteMany(medias: Media[]): Promise<void> {
    const remainingMedias = this.items.filter((item) => {
      return !medias.some((media) => media.equals(item));
    });

    this.items = remainingMedias;
  }

  public async findManyByPostID(postID: string): Promise<Media[]> {
    const medias = this.items.filter(
      (item) => item.postID.toString() === postID,
    );

    return medias;
  }

  public async deleteManyByPostID(postID: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== postID);
  }
}
