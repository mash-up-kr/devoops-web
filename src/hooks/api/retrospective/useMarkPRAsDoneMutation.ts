import { useMutation } from '@tanstack/react-query';

import { markPRAsDone } from '@/apis/pull-requests/retrospective.mutate';

export const useMarkPRAsDoneMutation = () =>
  useMutation({
    mutationFn: ({ pullRequestId }: { pullRequestId: number }) => {
      return markPRAsDone(pullRequestId);
    },
  });
