import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError, AxiosHeaders } from 'axios';

import { getTokenAction } from '@/actions/token.action';

interface IErrorResponse {
  code: string;
  status: number;
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

const onError = (error: AxiosError<IErrorResponse>) => {
  if (error.response) {
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
