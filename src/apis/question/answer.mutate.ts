import type { UserType, AnswerUpdateRequestType } from '@/__generated__/@types';
import { apiApi } from '@/__generated__/Api/Api.api';

// 회고 생성
export async function createAnswer(questionId: number, user: UserType) {
  return apiApi.createAnswer({ questionId, query: { user } });
}

// 다수 회고 최신화
export async function updateAllAnswers(user: UserType, answers: any) {
  return apiApi.updateAllAnswer({ query: { user }, data: { answers } });
}

// 회고 삭제
export async function deleteAnswer(answerId: number, user: UserType) {
  return apiApi.updateAnswer({ answerId, query: { user } });
}

// 단일 회고 갱신
export async function updateAnswer(answerId: number, user: UserType, data: AnswerUpdateRequestType) {
  return apiApi['1']({ answerId, query: { user }, data });
}
