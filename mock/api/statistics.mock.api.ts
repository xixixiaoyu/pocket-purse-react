import type { MockMethod } from 'vite-plugin-mock';
import { createStatisticsData } from '../helper/statistics.mock.helper';

export const statisticsAPI: MockMethod[] = [
  {
    url: '/api/v1/items/summary',
    method: 'get',
    statusCode: 200,
    timeout: 1000,
    response: ({ query }: any) => {
      const { happened_after, happened_before, kind, group_by } = query;
      return createStatisticsData({
        start: happened_after,
        end: happened_before,
        kind,
        group_by,
      });
    },
  },
];
