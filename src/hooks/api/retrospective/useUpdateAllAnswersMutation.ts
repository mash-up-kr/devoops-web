import { useMutation } from '@tanstack/react-query';

import { apiApi } from '@/__generated__/Api/Api.api';
import { UseMutationParams } from '@/types/tanstack-query/use-mutation-params';

export const useUpdateAllAnswersMutation = (params?: UseMutationParams<typeof apiApi.updateAllAnswer>) =>
  useMutation({
    mutationFn: apiApi.updateAllAnswer,
    ...(params?.options ?? {}),
  });
