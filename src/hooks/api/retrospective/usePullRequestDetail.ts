import { useQuery } from '@tanstack/react-query';

import type { UserType } from '@/__generated__/@types';
import { fetchPullRequestById } from '@/apis/pull-requests/retrospective.query';

export const usePullRequestDetail = (pullRequestId: number, user: UserType | null) => {
  return useQuery({
    queryKey: ['pullRequestDetail', pullRequestId],
    queryFn: () => {
      if (user && 'accessToken' in user && typeof user.accessToken === 'string') {
        return fetchPullRequestById(pullRequestId, user.accessToken);
      }
      throw new Error('로그인 정보가 없습니다.');
    },
    enabled: !!pullRequestId && !!user,
  });
};
