import Repository, { Criteria } from './repository';
import { Service } from 'typedi';
import { Prisma, News, PrismaClient } from 'generated/prisma/mongodb-client';
import { prisma } from '@/utils/prisma.db';
import { AnyObject, PaginatedResult } from '@/types';
import _ from 'lodash';
import { PAGI_LIMIT } from '@/constant';

@Service()
export default class NewsRepository implements Repository<News> {
  async saveMany(body: Prisma.NewsCreateInput[]): Promise<News[]> {
    await (prisma('mongodb') as PrismaClient).news.deleteMany({});
    return (await (prisma('mongodb') as PrismaClient).news.createMany({
      data: body,
    })) as unknown as News[];
  }

  async paginate(currentPage = 1, perPage = PAGI_LIMIT, criteria?: Criteria): Promise<PaginatedResult> {
    const filterCriteria = criteria ? this.processCriteria(criteria) : {};
    const result: AnyObject = await (prisma('mongodb') as PrismaClient).news.findRaw({
      filter: filterCriteria,
      options: {
        skip: Math.abs(currentPage - 1) * perPage,
        limit: perPage,
        sort: { publication_date: -1 },
      },
    });

    const count = Number(
      (await (prisma('mongodb') as PrismaClient).news.findRaw({ filter: filterCriteria }))?.length ?? 0
    );

    return {
      data: result.map((item: AnyObject) => {
        return {
          ...item,
          _id: item?._id?.$oid,
          publication_date: item?.publication_date?.$date,
          created_at: item?.created_at?.$date,
        };
      }),
      meta: {
        totalPage: Math.ceil(count / perPage),
        current: currentPage,
        totalItem: count,
        perPage: perPage,
      },
    };
  }

  processCriteria(queryParams: AnyObject) {
    const { keywords, publicationDate, people, locations, organizations } = queryParams;
    const criteria: AnyObject = {};

    if (publicationDate) {
      criteria.publicationDate = {
        $eq: publicationDate,
      };
    }

    if (keywords) {
      criteria.topics = {
        $elemMatch: {
          $regex: _.chain(_.trim(keywords, ', ')).toLower().split(',').join('|').value(),
          $options: 'i',
        },
      };
    }

    if (people) {
      criteria.people = {
        $elemMatch: {
          $regex: _.chain(_.trim(people, ', ')).toLower().split(',').join('|').value(),
          $options: 'i',
        },
      };
    }

    if (locations) {
      criteria.locations = {
        $elemMatch: {
          $regex: _.chain(_.trim(locations, ', ')).toLower().split(',').join('|').value(),
          $options: 'i',
        },
      };
    }

    if (organizations) {
      criteria.organizations = {
        $elemMatch: {
          $regex: _.chain(_.trim(organizations, ', ')).toLower().split(',').join('|').value(),
          $options: 'i',
        },
      };
    }

    return criteria;
  }
}
