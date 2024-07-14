import NewsService from '@/services/news.service';
import { Container } from 'typedi';
import schedule from 'node-schedule';
import { NEWS_SYNC_SCHEDULE_TIME } from '@/constant';

const scheduler = () => {
  return {
    start: async () => {
      const newsService = Container.get(NewsService);
      const rule = new schedule.RecurrenceRule();
      rule.minute = new schedule.Range(0, 59, NEWS_SYNC_SCHEDULE_TIME);

      // call first time when app is start
      await newsService.syncLatestNews();

      schedule.scheduleJob(rule, async () => {
        await newsService.syncLatestNews();
        console.log('new sync successfully');
      });
    },
  };
};

export default scheduler;
