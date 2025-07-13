import { useMutation } from '@tanstack/react-query';

import { apiApi } from '@/__generated__/Api/Api.api';
import { UseMutationParams } from '@/types/tanstack-query/use-mutation-params';

export const useUpdateAnswerMutation = (params?: UseMutationParams<(typeof apiApi)['1']>) =>
  useMutation({
    mutationFn: apiApi['1'],
    ...(params?.options ?? {}),
  });
