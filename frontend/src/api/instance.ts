import axios from 'axios';
import { getSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  async config => {
    const session = await getSession();
    if (session) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${session?.user?.jwtToken}`; // FIXME: user 타입
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export { instance };
