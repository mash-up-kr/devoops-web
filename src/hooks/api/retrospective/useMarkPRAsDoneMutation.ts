import { useMutation } from '@tanstack/react-query';

import type { UserType } from '@/__generated__/@types';
import { markPRAsDone } from '@/apis/pull-requests/retrospective.mutate';
import { getAccessToken } from '@/utils/getAccessToken';

export const useMarkPRAsDoneMutation = () =>
  useMutation({
    mutationFn: ({ user, pullRequestId }: { user: UserType; pullRequestId: number }) => {
      const accessToken = getAccessToken(user);
      if (!accessToken) throw new Error('토큰 없음');
      return markPRAsDone(pullRequestId, accessToken);
    },
  });
