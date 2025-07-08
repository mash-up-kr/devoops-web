import { AxiosInstance } from 'axios';

import type {
  UserSaveRequestType,
  UserSaveResponseType,
  UserTokenRefreshResponseType,
  UserType,
} from '@/__generated__/@types';
import instance from '@/apis/index';

export class AuthApi {
  axios: AxiosInstance = instance;

  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  createToken = async (data: UserSaveRequestType): Promise<UserSaveResponseType> => {
    const response = await this.axios.post<UserSaveResponseType>('/api/auth/github', data);
    return response.data;
  };

  refreshToken = async (): Promise<UserTokenRefreshResponseType> => {
    const response = await this.axios.post<UserTokenRefreshResponseType>('/api/auth/github/refresh', null);
    return response.data;
  };

  logout = async (user: UserType): Promise<void> => {
    await this.axios.post('/api/auth/logout', null, { params: { user } });
  };
}

const authApi = new AuthApi();

export default authApi;
