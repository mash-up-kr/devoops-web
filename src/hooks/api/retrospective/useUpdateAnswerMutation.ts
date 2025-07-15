import { useMutation } from '@tanstack/react-query';

import type { UserType } from '@/__generated__/@types';
import { updateRetrospectiveAnswer } from '@/apis/pull-requests/retrospective.mutate';
import { getAccessToken } from '@/utils/getAccessToken';

export const useUpdateAnswerMutation = () =>
  useMutation({
    mutationFn: ({ user, answerId, content }: { user: UserType; answerId: number; content: string }) => {
      const accessToken = getAccessToken(user);
      if (!accessToken) throw new Error('토큰 없음');
      return updateRetrospectiveAnswer(answerId, content, accessToken);
    },
  });
