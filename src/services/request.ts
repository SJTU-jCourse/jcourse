import axios from 'axios';
import { history } from 'umi';

const errorHandler = function (error: { response: { status: number } }) {
  if (error.response?.status == 403) history.push('/login');
  throw error;
};

export const request = axios.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
});

request.interceptors.response.use((response) => response, errorHandler);
