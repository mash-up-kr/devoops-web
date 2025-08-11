import { apiApi } from '@/__generated__/Api/Api.api';

// PR을 완료 상태로 변경하는 함수
export const markPRAsDone = async (pullRequestId: number): Promise<void> => {
  await apiApi.pullRequestUpdateToDone({ pullRequestId });
};

// 다수의 회고 답변을 한번에 제출하는 함수
export const submitRetrospectiveAnswers = async ({ answers }: { answers: { answerId: number; content: string }[] }) => {
  return apiApi.updateAllAnswer({ data: { answers } });
};

// 새로운 회고 답변을 생성하는 함수 ( 답변을 추가하면 POST 요청으로 answer ID를 생성 )
export async function createRetrospectiveAnswer(questionId: number) {
  return apiApi.createAnswer({ questionId });
}

// 기존 회고 답변을 수정하는 함수
export const updateRetrospectiveAnswer = async ({ answerId, content }: { answerId: number; content: string }) => {
  return apiApi.updateAnswer({ answerId, data: { content } });
};
