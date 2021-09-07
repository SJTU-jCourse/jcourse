import { CourseListItem } from '@/models';

import { request } from './request';

export function loginSync() {
  window.location.href = '/oauth/sync-lessons/login/';
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
