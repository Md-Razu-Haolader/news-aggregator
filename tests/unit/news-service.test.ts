import NewsService from '@/services/news.service';
import NewsRepository from '@/repositories/news.repository';
import AxiosClient from '@/utils/axios-client';

afterEach(async () => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

const newsService = new NewsService(new NewsRepository(), new AxiosClient());

describe('News service', () => {
  it('should be defined', () => {
    expect(newsService).toBeDefined();
  });

  describe('Get latest news feed', () => {
    it('should return latest news feed for valid urls', async () => {
      const result = await newsService.getLatestNewsFeed();
      expect(result).toBeDefined();
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('content');
      expect(result[0]).toHaveProperty('link');
      expect(result[0]).toHaveProperty('isoDate');
      expect(result[0]).toHaveProperty('contentSnippet');
      expect(result[0]).toHaveProperty('pubDate');
    });
  });
});
