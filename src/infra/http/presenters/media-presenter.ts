import { Media } from '@Domain/social-network/enterprise/entities/media';

export class MediaPresenter {
  public static toHTTP(media: Media) {
    return {
      url: media.url,
      type: media.type,
    };
  }
}
