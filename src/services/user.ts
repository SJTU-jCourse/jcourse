import { User, UserPoint } from '@/models';
import { request } from '@/services/request';

export async function getUser(): Promise<User> {
  const resp = await request('/api/me/');
  return resp.data;
}

export async function getUserPoint(): Promise<UserPoint> {
  const resp = await request('/api/points/');
  return resp.data;
}
