export type NewsFeed = {
  title: string;
  content: string;
  contentSnippet: string;
  pubDate: Date | string;
  isoDate: Date | string;
  link: string;
};

export type NewsEntity = {
  topics: string[];
  people: string[];
  locations: string[];
  organizations: string[];
};
