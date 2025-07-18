import { apiApi } from '@/__generated__/Api/Api.api';

export const markPRAsDone = async (pullRequestId: number): Promise<void> => {
  await apiApi.pullRequestUpdateToDone({ pullRequestId });
};

export const submitRetrospectiveAnswers = async ({ answers }: { answers: { answerId: number; content: string }[] }) => {
  return apiApi.updateAllAnswer({ data: { answers } });
};

export async function createRetrospectiveAnswer(questionId: number, accessToken: string) {
  const res = await fetch(`https://api.dev-oops.kr/api/questions/${questionId}/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || '회고 생성 실패');
  }
  return res.json();
}

export const updateRetrospectiveAnswer = async ({ answerId, content }: { answerId: number; content: string }) => {
  // 기존 accessToken 인자 제거, 쿠키 기반 인증
  return apiApi.updateAnswer({ answerId, data: { content } });
};
