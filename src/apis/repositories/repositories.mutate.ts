import { useMutation } from '@tanstack/react-query';

import { apiApi } from '@/__generated__/Api/Api.api';
import { UseMutationParams } from '@/types/tanstack-query/use-mutation-params';
import { isNotNull } from '@/types/utility/is-not-null';
import { Parameter } from '@/types/utility/parameter';

export const REPOSITORIES_API_MUTATION_KEY = {
  SAVE_REPOSITORY: (params?: Parameter<typeof apiApi.saveRepository>) =>
    ['repositories', 'save', params].filter(isNotNull),
};

export const useSaveRepositoryMutation = (params: UseMutationParams<typeof apiApi.saveRepository>) => {
  return useMutation({
    mutationFn: apiApi.saveRepository,
    ...params?.options,
  });
};

export const useDeleteRepositoryMutation = (params: UseMutationParams<typeof apiApi.deleteRepositories>) => {
  return useMutation({
    mutationFn: (variables) => apiApi.deleteRepositories(variables),
    ...params?.options,
  });
};
