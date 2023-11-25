import { WatchedList } from '@Core/entities/watched-list';
import { Pet } from './pet';

export class PetsList extends WatchedList<Pet> {
  public compareItems(a: Pet, b: Pet): boolean {
    return a.equals(b);
  }
}
