import { useMutation } from '@tanstack/react-query';

import { apiApi } from '@/__generated__/Api/Api.api';
import { UseMutationParams } from '@/types/tanstack-query/use-mutation-params';

export const useCreateAnswerMutation = (params?: UseMutationParams<typeof apiApi.createAnswer>) =>
  useMutation({
    mutationFn: apiApi.createAnswer,
    ...(params?.options ?? {}),
  });
