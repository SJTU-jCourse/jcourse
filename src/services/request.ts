import { message } from 'antd';
import axios from 'axios';
import { history } from 'umi';

const errorHandler = function (error: { response: { status: number } }) {
  if (error.response?.status == 403) history.push('/login');
  if (error.response?.status == 404) history.push('/404');
  if (error.response?.status == 429) message.error('操作太频繁，请稍后再试！');
  throw error;
};

export const request = axios.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
});

request.interceptors.response.use((response) => response, errorHandler);
