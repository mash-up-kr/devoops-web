import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';

interface IErrorResponse {
  code: string;
  status: number;
  message: string;
}

const { API_BASE_URL } = process.env;

const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onRequest = (config: InternalAxiosRequestConfig) => {
  return Promise.resolve(config);
};

const onResponse = (response: AxiosResponse) => {
  return response;
};

const onError = (error: AxiosError<IErrorResponse>) => {
  if (error.response?.data) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error);
};

const setInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onError);
  axiosInstance.interceptors.response.use(onResponse, onError);

  return axiosInstance;
};

export default setInterceptors(instance);
