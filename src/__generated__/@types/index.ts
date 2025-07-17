/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: brightbong92                                      ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */


/**
 * 회고 최신화 요청 목록
 */
export interface AnswerPutRequestType {
  /**
   * 회고 id
   * @format int64
   * @example 1
   */
  answerId?: number;
  /**
   * 회고 내용
   * @example "엄청난 깨달음!"
   */
  content: string;
}

export interface AnswerPutRequestsType {
  answers?: AnswerPutRequestType[];
}

export interface AnswerSaveResponseType {
  /**
   * 회고 id
   * @format int64
   * @example 1
   */
  id?: number;
}

export interface GithubTokenType {
  token?: string;
}

export interface UserType {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  providerId?: number;
  nickname?: string;
  profileImageUrl?: string;
  githubToken?: GithubTokenType;
}

export interface LogoutV1RequestType {
  /**
   * 로그아웃 시도 회원 엑세스 토큰
   * @example "accessToken"
   */
  accessToken: string;
  /**
   * 로그아웃 시도 회원 리프레시 토큰
   * @example "oldRefreshToken"
   */
  refreshToken: string;
}

export interface RefreshTokenV1RequestType {
  /**
   * 재발급 대상 엑세스 토큰
   * @example "oldAccessToken"
   */
  accessToken: string;
  /**
   * 재발급 대상 리프레시 토큰
   * @example "oldRefreshToken"
   */
  refreshToken: string;
}

export interface UserTokenRefreshResponseType {
  /**
   * 깃허브 회원 아이디
   * @example "refershAccessToken"
   */
  accessToken?: string;
  /**
   * 재발급한 리프레시 토큰
   * @example "refreshRefreshToken"
   */
  refreshToken?: string;
}

export interface RepositorySaveRequestType {
  /**
   * 레포지토리 URL
   * @example "https://github.com/gss/coli"
   */
  url: string;
}

export interface RepositorySaveResponseType {
  /**
   * 레포지토리 id
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 레포지토리 소유 유저 id
   * @format int64
   * @example 2
   */
  ownerId?: number;
  /**
   * 레포지토리 이름
   * @example "dev-oops"
   */
  name?: string;
  /**
   * 레포지토리 url
   * @example "https://github.com/devoops/devoops-api"
   */
  url?: string;
}

export interface UserSaveRequestType {
  /**
   * 깃허브 액세스 토큰
   * @example "64a6f1dd4379e7abffa6"
   */
  githubAccessToken: string;
}

export interface UserSaveResponseType {
  /**
   * 애플리케이션 유저 아이디
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 깃허브 회원 닉네임
   * @example "my_nickname"
   */
  nickname?: string;
  /**
   * 깃허브 프로필 url
   * @example "https://avatars.githubusercontent.com/u/148152234?v=4"
   */
  profileImageUrl?: string;
  /**
   * 엑세스 토큰
   * @example "accesstokenValue.."
   */
  accessToken?: string;
  /**
   * 리프레시 토큰
   * @example "refreshTokenValue.."
   */
  refreshToken?: string;
}

export interface AnswerUpdateRequestType {
  /**
   * 회고 내용
   * @example "엄청난 깨달음!"
   */
  content: string;
}

export interface AnswerUpdateResponseType {
  /**
   * 회고 id
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 회고 내용
   * @example "엄청난 깨달음!"
   */
  content: string;
}

export interface UserReadResponseType {
  /**
   * 유저 아이디
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 깃허브 회원 닉네임
   * @example "my_nickname"
   */
  nickname?: string;
  /**
   * 깃허브 프로필 url
   * @example "https://avatars.githubusercontent.com/u/148152234?v=4"
   */
  profileImageUrl?: string;
}

/**
 * 레포지토리 PR 리스트 모음
 */
export interface RepositoryPullRequestResponseType {
  /**
   * 풀 리퀘스트 ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 풀 리퀘스트 제목
   * @example "[FIX] 서버 장애 대응"
   */
  title: string;
  /**
   * 기록 상태
   * @example "PROGRESS"
   */
  recordStatus: 'PENDING' | 'PROGRESS' | 'DONE';
  /**
   * 머지된 날짜
   * @format date
   * @example "2025-07-07"
   */
  mergedAt: string;
  /**
   * 회고 요약
   * @example "이번 장애에서의 문제 상황과 대응 과정을 정리하였습니다."
   */
  summary: string;
  /**
   * PR 라벨
   * @example "feat"
   */
  tag?: string;
}

export interface RepositoryPullRequestResponsesType {
  pullRequests?: RepositoryPullRequestResponseType[];
}

export interface PullRequestReadResponseType {
  /**
   * 풀 리퀘스트 id
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 회고 제목
   * @example "서비스 장애 회고"
   */
  title: string;
  /**
   * 회고 라밸
   * @example "feat"
   */
  tag: string;
  /**
   * 기록 상태
   * @example "PROGRESS"
   */
  recordStatus: 'PENDING' | 'PROGRESS' | 'DONE';
  /**
   * 풀 리퀘스트 url
   * @example "https://github.com/aaa/bbb/pull/4"
   */
  pullRequestUrl: string;
  /**
   * 머지 시각
   * @format date-time
   */
  mergedAt: string;
  /**
   * PR 2줄 요약
   * @example "이 PR은 ~~를 위해 만들어진 PR입니다"
   */
  summary: string;
  /**
   * 회고 카테고리 목록
   * @example "{성능, 안전성, 실용성, 가독성}"
   */
  categories: string[];
  questions: QuestionBriefResponseType[];
}

/**
 * 회고-질문 내역 목록
 */
export interface QuestionBriefResponseType {
  /**
   * 질문 id
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 질문 선택 유무
   * @example true
   */
  isSelected?: boolean;
  /**
   * 카테고리
   * @example "성능"
   */
  category?: string;
  /**
   * 질문 내용
   * @example "성능적으로 좋은 선택이라 생각하나요?"
   */
  content?: string;
  /**
   * 최초 대답한 시간
   * @format date-time
   * @example "2025-06-24T15:29:45Z"
   */
  createdAt?: string;
  /**
   * 가장 최근 대답한 시간
   * @format date-time
   * @example "2025-06-24T15:29:45Z"
   */
  updatedAt?: string;
}

export interface MyRepositoriesResponseType {
  repositories?: RepositorySummaryType[];
}

export interface RepositorySummaryType {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format int32 */
  pullRequestCount?: number;
}

export interface PullRequestDetailReadResponseType {
  /**
   * 풀 리퀘스트 id
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 회고 제목
   * @example "서비스 장애 회고"
   */
  title: string;
  /**
   * 회고 라밸
   * @example "feat"
   */
  tag: string;
  /**
   * 회고 기록 상태
   * @example "PROGRESS"
   */
  recordStatus: 'PENDING' | 'PROGRESS' | 'DONE';
  /**
   * 풀 리퀘스트 url
   * @example "https://github.com/aaa/bbb/pull/4"
   */
  pullRequestUrl: string;
  /**
   * 머지 시각
   * @format date-time
   */
  mergedAt: string;
  /**
   * PR 2줄 요약
   * @example "이 PR은 ~~를 위해 만들어진 PR입니다"
   */
  summary: string;
  categories: string[];
  questions: QuestionAnswerResponseType[];
}

/**
 * 회고-질문과 답변 내역
 */
export interface QuestionAnswerResponseType {
  /**
   * 질문 ID
   * @format int64
   * @example 101
   */
  questionId?: number;
  /**
   * 질문 카테고리
   * @example "가독성"
   */
  category?: string;
  /**
   * 질문 내용
   * @example "이 코드에서 가장 가독성이 떨어지는 부분은 무엇인가요?"
   */
  content?: string;
  /**
   * 선택된 질문 여부
   * @example true
   */
  isSelected?: boolean;
  /**
   * 답변 ID (없을 수도 있음)
   * @format int64
   * @example 202
   */
  answerId?: number | null;
  /**
   * 답변 내용
   * @example "변수명이 추상적이라 처음 읽을 때 이해가 어려웠습니다."
   */
  answer?: string | null;
}

/**
 * 회고 최신화 요청 목록
 */
export interface PullRequestRankingResponseType {
  /**
   * PR ID
   * @format int64
   * @example 1
   */
  pullRequestId?: number;
  /**
   * PR 제목
   * @example "성능 개선 회고"
   */
  title: string;
  /**
   * 질문 내용
   * @example "이 PR에서 성능 개선을 위해 어떤 기법을 적용했나요?"
   */
  content: string;
  /**
   * 회고가 마지막으로 수정된 시각
   * @format date-time
   */
  updatedAt: string;
}

export interface PullRequestRankingResponsesType {
  answerRanking?: PullRequestRankingResponseType[];
}
