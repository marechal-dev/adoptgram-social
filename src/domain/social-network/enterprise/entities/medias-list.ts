import { WatchedList } from '@Core/entities/watched-list';
import { Media } from './media';

export class MediasList extends WatchedList<Media> {
  public compareItems(a: Media, b: Media): boolean {
    throw a.equals(b);
  }
}
