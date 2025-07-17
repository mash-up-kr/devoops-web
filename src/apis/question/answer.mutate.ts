import type { UserType, AnswerUpdateRequestType } from '@/__generated__/@types';
import { apiApi } from '@/__generated__/Api/Api.api';

// 회고 생성
export async function createAnswer(questionId: number) {
  return apiApi.createAnswer({ questionId });
}

// 다수 회고 최신화
export async function updateAllAnswers(user: UserType, answers: any) {
  return apiApi.updateAllAnswer({ data: { answers } });
}

// 회고 삭제
export async function deleteAnswer(answerId: number) {
  return apiApi.deleteAnswer({ answerId, data: { content: '' } });
}

// 단일 회고 갱신
export async function updateAnswer(answerId: number, user: UserType, data: AnswerUpdateRequestType) {
  return apiApi.updateAnswer({ answerId, data });
}
