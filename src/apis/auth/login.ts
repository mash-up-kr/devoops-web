import { AxiosResponse } from 'axios';

import http from '@/apis/';

interface ILoginRequestBody {
  githubAccessToken: string;
}

interface ILoginRequest {
  body: ILoginRequestBody;
}

interface ILoginResponse {
  providerId: number;
  nickname: string;
  profileImageUrl: string;
  accessToken: string;
  refreshToken: string;
}

export const login = ({ body }: ILoginRequest) => {
  const response = http.post<ILoginResponse, AxiosResponse<ILoginResponse>, ILoginRequestBody>('/auth/github', body);

  return response;
};
