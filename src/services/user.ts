import { User } from '@/models';
import { request } from '@/services/request';

export async function getUser(): Promise<User> {
  return await request('/api/me/');
}
