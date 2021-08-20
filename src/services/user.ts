import { User } from '@/models';
import { request } from '@/services/request';
import Cookies from 'js-cookie';

export async function getUser(): Promise<User> {
  const resp = await request('/api/me/');
  const account = Cookies.get('account');
  localStorage.setItem('account', account ? account : '');
  return resp.data;
}
