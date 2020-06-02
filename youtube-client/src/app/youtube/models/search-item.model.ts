interface ThumbnailsItem {
  url: string;
  width: number;
  height: number;
}

interface SnippetThumbnails {
  default: ThumbnailsItem;
  medium: ThumbnailsItem;
  high: ThumbnailsItem;
  standard: ThumbnailsItem;
  maxres: ThumbnailsItem;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: SnippetThumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  defaultLanguage?: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage: string;
}

interface Localized {
  title: string;
  description: string;
}

interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

interface Id {
  kind: string;
  videoId: string;
}

export interface SearchItem {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
  statistics: Statistics;
}

export interface SearchItemStatistic {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}
