import { useMutation } from '@tanstack/react-query';

import type { UserType } from '@/__generated__/@types';
import { submitRetrospectiveAnswers } from '@/apis/pull-requests/retrospective.mutate';
import { getAccessToken } from '@/utils/getAccessToken';

export const useUpdateAllAnswersMutation = () =>
  useMutation({
    mutationFn: ({ user, answers }: { user: UserType; answers: { answerId: number; content: string }[] }) => {
      const accessToken = getAccessToken(user);
      if (!accessToken) throw new Error('토큰 없음');
      return submitRetrospectiveAnswers(accessToken, answers);
    },
  });
