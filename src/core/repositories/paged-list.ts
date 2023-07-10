export interface PagedListHttpPayload<TItems> {
  items: TItems[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export class PagedList<TItems> {
  private readonly items: TItems[];
  private readonly currentPage: number;
  private readonly pageSize: number;
  private readonly totalCount: number;

  public constructor(
    items: TItems[],
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

  public toHttpPayload(): PagedListHttpPayload<TItems> {
    return {
      items: this.items,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      totalCount: this.totalCount,
      hasNextPage: this.hasNextPage,
      hasPreviousPage: this.hasPreviousPage,
    };
  }
}
