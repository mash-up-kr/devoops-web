import { useMutation } from '@tanstack/react-query';

import authApi from '@/apis/auth/AuthApi';
import { UseMutationParams } from '@/types/tanstack-query/use-mutation-params';

export const useCreateTokenMutation = (params: UseMutationParams<typeof authApi.createToken>) => {
  return useMutation({
    mutationFn: authApi.createToken,
    ...params.options,
  });
};

export const useRefreshTokenMutation = (params: UseMutationParams<typeof authApi.refreshToken>) => {
  return useMutation({
    mutationFn: authApi.refreshToken,
    ...params.options,
  });
};

export const useLogoutMutation = (params: UseMutationParams<typeof authApi.logout>) => {
  return useMutation({
    mutationFn: authApi.logout,
    ...params.options,
  });
};
