import type { UserType } from '@/__generated__/@types';
import { apiApi } from '@/__generated__/Api/Api.api';

export async function markPRAsDone(pullRequestId: number, user: UserType): Promise<void> {
  try {
    await apiApi.pullRequestUpdateToDone({
      pullRequestId,
      query: { user },
    });
  } catch (error: any) {
    const message = error.response?.data?.message || 'PR 회고 완료 요청 실패';
    throw new Error(message);
  }
}

export async function submitRetrospectiveAnswers(user: UserType, answers: { answerId: number; content: string }[]) {
  const res = await apiApi.updateAllAnswer({
    query: { user },
    data: { answers },
  });

  return res.data;
}

export async function createRetrospectiveAnswer(questionId: number, user: UserType) {
  try {
    const res = await apiApi.createAnswer({
      questionId,
      query: { user },
    });
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || '회고 생성 실패';
    throw new Error(message);
  }
}
