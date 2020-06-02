import { SearchItem, SearchItemStatistic } from './search-item.model';

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface SearchResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: SearchItem[];
}

export interface StatisticResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: SearchItemStatistic[];
}
