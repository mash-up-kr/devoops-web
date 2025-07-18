import { useMutation } from '@tanstack/react-query';

import { updateRetrospectiveAnswer } from '@/apis/pull-requests/retrospective.mutate';

export const useUpdateAnswerMutation = () =>
  useMutation({
    mutationFn: ({ answerId, content }: { answerId: number; content: string }) => {
      return updateRetrospectiveAnswer({ answerId, content });
    },
  });
