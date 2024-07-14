import NewsRepository from '@/repositories/news.repository';
import { News } from 'generated/prisma/mongodb-client';
import { Service } from 'typedi';
import Parser from 'rss-parser';
import { HttpError } from 'routing-controllers';
import { AnyObject } from '@/types';
import AxiosClient from '@/utils/axios-client';
import { NewsEntity, NewsFeed } from '@/types/news';
import nlp from 'compromise';
import { feedUrls } from '@/config';
import _ from 'lodash';

@Service()
export default class NewsService {
  public parser;
  constructor(public repository: NewsRepository, public http: AxiosClient) {
    this.parser = new Parser();
  }

  async syncLatestNews(): Promise<Array<Omit<News, 'id' | 'createdAt'>>> {
    const newsFeed = await this.getLatestNewsFeed();
    const newsFeedWithEntity = await Promise.all(
      newsFeed.map(async (item) => {
        const { title, contentSnippet: description, isoDate: publicationDate, link: sourceUrl } = item;
        const entities = await this.extractEntities(`${title} ${description}`);
        return {
          title,
          description,
          publicationDate: new Date(publicationDate),
          sourceUrl,
          ...entities,
        };
      })
    );
    await this.repository.saveMany(newsFeedWithEntity);
    return newsFeedWithEntity;
  }

  async getLatestNewsFeed(): Promise<NewsFeed[]> {
    const newsFeed: Array<NewsFeed> = [];

    for (const url of feedUrls) {
      try {
        const response = await this.http.get(url);
        const feed = await this.parser.parseString(String(response?.data ?? ''));
        newsFeed.push(...(feed.items as NewsFeed[]));
      } catch (error: unknown) {
        const statusCode = (error as AnyObject)?.response?.status ?? 500;
        throw new HttpError(statusCode, `Something went wrong while fetching feed from ${url}`);
      }
    }

    return newsFeed;
  }

  async extractEntities(text: string): Promise<NewsEntity> {
    const nlpModule = nlp(text);

    return {
      topics: _.map(nlpModule.nouns().out('array'), _.toLower),
      people: _.map(nlpModule.people().out('array'), _.toLower),
      locations: _.map(nlpModule.places().out('array'), _.toLower),
      organizations: _.map(nlpModule.organizations().out('array'), _.toLower),
    };
  }
}
