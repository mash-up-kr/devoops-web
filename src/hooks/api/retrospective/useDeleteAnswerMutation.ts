import { useMutation } from '@tanstack/react-query';

import { apiApi } from '@/__generated__/Api/Api.api';
import { UseMutationParams } from '@/types/tanstack-query/use-mutation-params';

export const useDeleteAnswerMutation = (params?: UseMutationParams<typeof apiApi.deleteAnswer>) =>
  useMutation({
    mutationFn: apiApi.deleteAnswer,
    ...(params?.options ?? {}),
  });
