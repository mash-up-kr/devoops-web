import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError, AxiosHeaders } from 'axios';

import { getTokenAction, deleteTokenAction } from '@/actions/token.action';

interface IErrorResponse {
  code: string;
  status: string;
  message: string;
}

const instance = axios.create({
  baseURL: process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onRequest = async (config: InternalAxiosRequestConfig) => {
  const token = await getTokenAction();
  if (token) {
    const headers = new AxiosHeaders(config.headers);
    headers.set('Authorization', `Bearer ${token.accessToken}`);
    return {
      ...config,
      headers,
    };
  }
  return config;
};

const onResponse = (response: AxiosResponse) => {
  return response;
};

const onError = async (error: AxiosError<IErrorResponse>) => {
  if (error.response) {
    // 토큰 만료에 대한 redirect 처리
    if (error.response.data?.code === 'TOKEN_EXPIRED') {
      await deleteTokenAction();
      window.location.href = '/landing';
      return new Promise(() => {});
    }
    return Promise.reject(error);
  }

  if (error.request) {
    return Promise.reject(error.request);
  }

  if (error.message) {
    return Promise.reject(error.message);
  }

  return Promise.reject(error);
};

const setInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onError);
  axiosInstance.interceptors.response.use(onResponse, onError);

  return axiosInstance;
};

export default setInterceptors(instance);
