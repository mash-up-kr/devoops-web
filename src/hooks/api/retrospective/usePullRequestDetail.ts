import { useQuery } from '@tanstack/react-query';

import type { UserType } from '@/__generated__/@types';
import { fetchPullRequestById } from '@/apis/retrospective';

export const usePullRequestDetail = (pullRequestId: number, user: UserType | null) => {
  return useQuery({
    queryKey: ['pullRequestDetail', pullRequestId],
    queryFn: () => {
      if (user) {
        return fetchPullRequestById(pullRequestId, user);
      }
      throw new Error('로그인 정보가 없습니다.');
    },
    enabled: !!pullRequestId && !!user,
  });
};
