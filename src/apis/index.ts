import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';

export interface ErrorResponse {
  code: string;
  status: number;
  message: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onRequest = (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  return Promise.resolve(config);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onError = (error: AxiosError<ErrorResponse> | Error) => {
  return Promise.reject(error);
};

const setInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onError);
  axiosInstance.interceptors.response.use(onResponse, onError);

  return axiosInstance;
};

export const api = setInterceptors(instance);
