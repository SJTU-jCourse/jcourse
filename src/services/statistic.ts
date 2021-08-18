import { StatisticInfo } from '@/models';
import { request } from '@/services/request';

export async function getStatistic(): Promise<StatisticInfo> {
  const resp = await request('/api/statistic/');
  return resp.data;
}
