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

const onRequest = (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  return Promise.resolve(config);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onError = (error: AxiosError<IErrorResponse>): Promise<never> => {
  if (error.response?.data) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error);
};

const setInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onError);
  axiosInstance.interceptors.response.use(onResponse, onError);

  return axiosInstance;
};

export default setInterceptors(instance);
