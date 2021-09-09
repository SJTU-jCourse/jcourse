import { request } from '@/services/request';

export async function writeReport(comment: string) {
  return await request('/api/report/', { method: 'post', data: { comment } });
}

export async function getReports() {
  const resp = await request('/api/report/');
  return resp.data;
}
