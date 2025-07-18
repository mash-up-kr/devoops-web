import { useMutation } from '@tanstack/react-query';

import { submitRetrospectiveAnswers } from '@/apis/pull-requests/retrospective.mutate';

export const useUpdateAllAnswersMutation = () =>
  useMutation({
    mutationFn: ({ answers }: { answers: { answerId: number; content: string }[] }) => {
      return submitRetrospectiveAnswers({ answers });
    },
  });
