import config from '@/config';
import { User, UserPoint } from '@/models';
import { request } from '@/services/request';

export async function auth(code: string) {
  const resp = await request('/oauth/jaccount/auth/', {
    params: {
      code: code,
      redirect_uri: config.JACCOUNT_LOGIN_RETURI,
    },
  });
  return resp.data;
}

export async function logOut() {
  const resp = await request('/oauth/logout');
  return resp.data;
}

export async function getUser(): Promise<User> {
  const resp = await request('/api/me/');
  return resp.data;
}

export async function getUserPoint(): Promise<UserPoint> {
  const resp = await request('/api/points/');
  return resp.data;
}
