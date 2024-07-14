import NewsService from '@/services/news.service';
import { ApiResponse } from '@/types';
import { Request, Response } from 'express';
import { Controller, Get, Post, Req, Res } from 'routing-controllers';
import NewsRepository from '@/repositories/news.repository';
import { Service } from 'typedi';
import { PAGI_LIMIT } from '@/constant';

@Service()
@Controller()
export class NewsController {
  constructor(public service: NewsService, public repository: NewsRepository) {}

  @Get('/news')
  async index(@Req() req: Request, @Res() res: Response<ApiResponse>) {
    const result = await this.repository.paginate(
      Number(req?.query?.page ?? 1),
      Number(req?.query?.limit ?? PAGI_LIMIT),
      req?.query
    );
    return res.status(200).json({
      message: `Total ${result?.data?.length} news found.`,
      data: result.data,
      meta: result.meta,
    });
  }

  @Post('/news/sync')
  async syncLatestNews(@Res() res: Response<ApiResponse>) {
    const result = await this.service.syncLatestNews();
    return res.status(200).json({
      message: 'News sync successfully',
      data: result,
    });
  }
}
