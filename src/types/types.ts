interface LoginLink {
  loginLink: string;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
interface Localized {
  title: string;
  description: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  localized?: Localized | undefined;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  };
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: {
    kind: string;
    videoId: string;
  };
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

interface ContentDetails {
  videoId: string;
  videoPublishedAt: string;
}

interface PlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

type PlaylistItems = PlaylistItem[];

interface TokenObject {
  access_token: string
  refresh_token: string
  scope: string
  token_type: string
  expiry_date: number
}
