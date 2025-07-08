import { useMutation } from '@tanstack/react-query';

import { apiApi } from '@/__generated__/Api/Api.api';
import { UseMutationParams } from '@/types/tanstack-query/use-mutation-params';

export const useIssueTokenMutation = (params: UseMutationParams<typeof apiApi.issueToken>) => {
  return useMutation({
    mutationFn: apiApi.issueToken,
    ...params?.options,
  });
};

export const useRefreshTokenMutation = (params: UseMutationParams<typeof apiApi.reIssueToken>) => {
  return useMutation({
    mutationFn: apiApi.reIssueToken,
    ...params?.options,
  });
};

export const useLogoutMutation = (params: UseMutationParams<typeof apiApi.logout>) => {
  return useMutation({
    mutationFn: apiApi.logout,
    ...params?.options,
  });
};
