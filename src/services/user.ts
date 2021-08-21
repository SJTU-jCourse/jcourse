import { User } from '@/models';
import { request } from '@/services/request';

export async function getUser(): Promise<User> {
  const resp = await request('/api/me/');
  return resp.data;
}
