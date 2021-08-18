import { Notice } from '@/models';
import { request } from '@/services/request';

export async function getNotices(): Promise<Notice[]> {
  const resp = await request('/api/notice/');
  return resp.data;
}
