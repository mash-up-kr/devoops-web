import { useMutation } from '@tanstack/react-query';

import type { UserType } from '@/__generated__/@types';
import { createRetrospectiveAnswer } from '@/apis/pull-requests/retrospective.mutate';
import { getAccessToken } from '@/utils/getAccessToken';

export const useCreateAnswerMutation = () =>
  useMutation({
    mutationFn: ({ user, questionId }: { user: UserType; questionId: number }) => {
      const accessToken = getAccessToken(user);
      if (!accessToken) throw new Error('토큰 없음');
      return createRetrospectiveAnswer(questionId, accessToken);
    },
  });
