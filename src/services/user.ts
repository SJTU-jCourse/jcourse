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

export async function logout() {
  const resp = await request('/oauth/logout');
  window.location.href = `https://jaccount.sjtu.edu.cn/oauth2/logout?client_id=${config.JACCOUNT_CLIENT_ID}&post_logout_redirect_uri=${config.JACCOUNT_LOGIN_RETURI}`;
  //return resp.data;
}

export async function getUser(): Promise<User> {
  const resp = await request('/api/me/');
  let user: User = resp.data;
  user.account = localStorage.getItem('account');
  return user;
}

export async function getUserPoint(): Promise<UserPoint> {
  const resp = await request('/api/points/');
  return resp.data;
}

export function toAdmin() {
  window.location.href = '/admin/';
}
