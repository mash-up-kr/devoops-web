import { useMutation } from '@tanstack/react-query';

import { apiApi } from '@/__generated__/Api/Api.api';
import { UseMutationParams } from '@/types/tanstack-query/use-mutation-params';

export const useSaveRepositoryMutation = (params: UseMutationParams<typeof apiApi.saveRepository>) => {
  return useMutation({
    mutationFn: apiApi.saveRepository,
    ...params?.options,
  });
};
