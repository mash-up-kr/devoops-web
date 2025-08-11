import { useMutation } from '@tanstack/react-query';

import { createRetrospectiveAnswer } from '@/apis/pull-requests/retrospective.mutate';

export const useCreateAnswerMutation = () =>
  useMutation({
    mutationFn: ({ questionId }: { questionId: number }) => {
      return createRetrospectiveAnswer(questionId);
    },
  });
