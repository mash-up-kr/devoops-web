import { useMutation } from '@tanstack/react-query';
// import { updateAnswer } from '@/apis/pull-requests/retrospective.mutate';

export const useUpdateAnswerMutation = () =>
  useMutation({
    // mutationFn: ({ user, answerId, content }: { user: UserType; answerId: number; content: string }) => {
    //   const accessToken = user?.accessToken || user?.githubToken?.token;
    //   return updateAnswer(accessToken, answerId, content);
    // },
  });
