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

export interface AnswerPutRequestType {
  /** @format int64 */
  answerId?: number;
  content: string;
}

export interface AnswerPutRequestsType {
  answers?: AnswerPutRequestType[];
}

export interface AnswerPutResponseType {
  /** @format int64 */
  answerId?: number;
  content?: string;
}

export interface AnswerPutResponsesType {
  answers?: AnswerPutResponseType[];
}

export interface RepositorySaveRequestType {
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

export interface AnswerSaveResponseType {
  /** @format int64 */
  id?: number;
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
   * 깃허브 회원 아이디
   * @format int64
   * @example 234558
   */
  providerId?: number;
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

export interface AnswerUpdateRequestType {
  content: string;
}

export interface AnswerUpdateResponseType {
  /** @format int64 */
  id?: number;
  content: string;
}

export interface RepositoryPullRequestResponseType {
  /** @format int64 */
  id?: number;
  title: string;
  recordStatus: 'PENDING' | 'PROGRESS' | 'DONE';
  /** @format date */
  mergedAt: string;
  summary: string;
  tag?: string;
}

export interface RepositoryPullRequestResponsesType {
  pullRequests?: RepositoryPullRequestResponseType[];
}

export interface PullRequestReadResponseType {
  /** @format int64 */
  id?: number;
  title: string;
  tag: string;
  recordStatus: 'PENDING' | 'PROGRESS' | 'DONE';
  /** @format date-time */
  mergedAt: string;
  summary: string;
  categories: string[];
  questions: QuestionResponseType[];
}

export interface QuestionResponseType {
  /** @format int64 */
  questionId?: number;
  category?: string;
  content?: string;
  isSelected?: boolean;
  /** @format int64 */
  answerId?: number;
  answer: string;
}
