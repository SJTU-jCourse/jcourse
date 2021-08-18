import { Notice } from '@/models';
import { request } from '@/services/request';

export async function getNotices(): Promise<Notice[]> {
  return await request('/api/notice/');
}
