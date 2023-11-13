export interface PagedListHttpPayload<TItem> {
  items: TItem[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export class PagedList<TItem> {
  public readonly items: TItem[];
  public readonly currentPage: number;
  public readonly pageSize: number;
  public readonly totalCount: number;

  public constructor(
    items: TItem[],
    currentPage: number,
    pageSize: number,
    totalCount: number,
  ) {
    this.items = items;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
  }

  public get hasNextPage(): boolean {
    return this.currentPage * this.pageSize < this.totalCount;
  }

  public get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
}
