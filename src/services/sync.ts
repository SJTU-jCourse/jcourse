import config from '@/config';
import { CourseListItem } from '@/models';

import { request } from './request';

export function loginSync() {
  const jAccountUri = `https://jaccount.sjtu.edu.cn/oauth2/authorize?client_id=${config.JACCOUNT_CLIENT_ID}&redirect_uri=${config.JACCOUNT_SYNC_RETURI}&response_type=code&scope=openid lessons`;
  window.location.href = jAccountUri;
}

export async function authSync(code: string) {
  const resp = await request('/oauth/sync-lessons/auth/', {
    params: {
      code: code,
      redirect_uri: config.JACCOUNT_SYNC_RETURI,
    },
  });
  return resp.data;
}

export async function syncLessons(semester: string): Promise<CourseListItem[]> {
  const resp = await request(`/api/sync-lessons/${semester}/`, {
    method: 'POST',
  });
  return resp.data;
}

export async function getLessons(): Promise<CourseListItem[]> {
  const resp = await request('/api/lesson/');
  return resp.data;
}
