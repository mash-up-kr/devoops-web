import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** 인터셉터 핸들러 */
const onRequest = (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  return Promise.resolve(config);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

/** 에러 처리 */
const onError = (status: number, message: string) => {
  throw { status, message };
};

const onRequestError = (error: AxiosError) => {
  const status = error.response?.status || 0;

  switch (true) {
    case Boolean(error?.config):
      onError(status, '요청이 실패했습니다.');
      break;
    case Boolean(error?.request):
      onError(status, '응답이 없습니다.');
      break;
    default:
      onError(status, `에러가 발생했습니다. ${error.message}`);
      break;
  }

  return Promise.reject(error);
};

const onResponseError = (error: AxiosError | Error) => {
  const status = axios.isAxiosError(error) && error.response ? error.response.status : 0;

  if (axios.isAxiosError(error)) {
    switch (status) {
      case 400:
        onError(status, '잘못된 요청입니다.');
        break;
      case 401: {
        onError(status, '인증 실패입니다.');
        break;
      }
      case 403: {
        onError(status, '권한이 없습니다.');
        break;
      }
      case 404: {
        onError(status, '찾을 수 없는 페이지입니다.');
        break;
      }
      case 500: {
        onError(status, '서버 오류입니다.');
        break;
      }
      default: {
        onError(status, `에러가 발생했습니다. ${error?.message}`);
      }
    }
  } else if (error instanceof Error && error.name === 'TimeoutError') {
    onError(status, '요청 시간이 초과되었습니다.');
  } else {
    onError(status, `에러가 발생했습니다. ${error.toString()}`);
  }

  return Promise.reject(error);
};

/** 인터셉터 설정 */
const setInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
};

export const api = setInterceptors(instance);
