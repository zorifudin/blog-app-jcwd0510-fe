export interface PaginationQueries {
  take?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface PaginationMeta {
  page: number;
  take: number;
  total: number;
}

export interface PageableTables<T> {
  data: T[];
  meta: PaginationMeta;
}
