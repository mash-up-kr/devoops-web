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


import instance from '@/apis/index';
import { ContentType, HttpClient, RequestParams } from '../@http-client';
import type {
  AnswerPutRequestsType,
  AnswerSaveResponseType,
  AnswerUpdateRequestType,
  AnswerUpdateResponseType,
  LogoutV1RequestType,
  MyRepositoriesResponseType,
  PullRequestDetailReadResponseType,
  PullRequestRankingResponsesType,
  PullRequestReadResponseType,
  RefreshTokenV1RequestType,
  RepositoryPullRequestResponsesType,
  RepositorySaveRequestType,
  RepositorySaveResponseType,
  UserReadResponseType,
  UserSaveRequestType,
  UserSaveResponseType,
  UserTokenRefreshResponseType,
  UserType,
} from '../@types';

export class ApiApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Question API
   * @name UpdateAllAnswer
   * @summary 다수 회고 최신화
   * @request PUT:/api/questions/answer
   * @secure
   */
  updateAllAnswer = (variables: { data: AnswerPutRequestsType; params?: RequestParams }) =>
    this.request<AnswerSaveResponseType, any>({
      path: `/api/questions/answer`,
      method: 'PUT',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags github-controller
   * @name RegisterWebhook
   * @request POST:/api/v1/github/repositories/{repositoryId}/webhooks
   */
  registerWebhook = (variables: {
    repositoryId: number;
    query: {
      user: UserType;
    };
    params?: RequestParams;
  }) =>
    this.request<void, any>({
      path: `/api/v1/github/repositories/${variables.repositoryId}/webhooks`,
      method: 'POST',
      query: variables.query,
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Auth API
   * @name LogoutV1
   * @summary 로그아웃 V1 API
   * @request POST:/api/v1/auth/logout
   * @secure
   */
  logoutV1 = (variables: { data: LogoutV1RequestType; params?: RequestParams }) =>
    this.request<void, any>({
      path: `/api/v1/auth/logout`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Auth API
   * @name ReIssueTokenV1
   * @summary 토큰 재발급 V1 API
   * @request POST:/api/v1/auth/github/refresh
   * @secure
   */
  reIssueTokenV1 = (variables: { data: RefreshTokenV1RequestType; params?: RequestParams }) =>
    this.request<UserTokenRefreshResponseType, any>({
      path: `/api/v1/auth/github/refresh`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Repository API
   * @name SaveRepository
   * @summary 신규 레포지토리 저장
   * @request POST:/api/repositories
   * @secure
   */
  saveRepository = (variables: { data: RepositorySaveRequestType; params?: RequestParams }) =>
    this.request<RepositorySaveResponseType, any>({
      path: `/api/repositories`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Question API
   * @name CreateAnswer
   * @summary 회고 생성
   * @request POST:/api/questions/{questionId}/answer
   * @secure
   */
  createAnswer = (variables: { questionId: number; params?: RequestParams }) =>
    this.request<AnswerSaveResponseType, any>({
      path: `/api/questions/${variables.questionId}/answer`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Auth API
   * @name Logout
   * @summary 로그 아웃
   * @request POST:/api/auth/logout
   * @secure
   */
  logout = (variables?: { params?: RequestParams }) =>
    this.request<void, any>({
      path: `/api/auth/logout`,
      method: 'POST',
      secure: true,
      ...variables?.params,
    });
  /**
   * No description
   *
   * @tags Auth API
   * @name IssueToken
   * @summary 회원 생성 & 토큰 발급
   * @request POST:/api/auth/github
   * @secure
   */
  issueToken = (variables: { data: UserSaveRequestType; params?: RequestParams }) =>
    this.request<UserSaveResponseType, any>({
      path: `/api/auth/github`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Auth API
   * @name ReIssueToken
   * @summary 토큰 재발급
   * @request POST:/api/auth/github/refresh
   * @secure
   */
  reIssueToken = (variables?: { params?: RequestParams }) =>
    this.request<UserTokenRefreshResponseType, any>({
      path: `/api/auth/github/refresh`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...variables?.params,
    });
  /**
   * No description
   *
   * @tags Question API
   * @name DeleteAnswer
   * @summary 회고 삭제
   * @request DELETE:/api/questions/answer/{answerId}
   * @secure
   */
  deleteAnswer = (variables: { answerId: number; data: AnswerUpdateRequestType; params?: RequestParams }) =>
    this.request<void, any>({
      path: `/api/questions/answer/${variables.answerId}`,
      method: 'DELETE',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Question API
   * @name UpdateAnswer
   * @summary 단일 회고 갱신
   * @request PATCH:/api/questions/answer/{answerId}
   * @secure
   */
  updateAnswer = (variables: { answerId: number; data: AnswerUpdateRequestType; params?: RequestParams }) =>
    this.request<AnswerUpdateResponseType, any>({
      path: `/api/questions/answer/${variables.answerId}`,
      method: 'PATCH',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Pull Request API
   * @name PullRequestUpdateToDone
   * @summary PR 회고 종료
   * @request PATCH:/api/pull-requests/{pullRequestId}/done
   * @secure
   */
  pullRequestUpdateToDone = (variables: { pullRequestId: number; params?: RequestParams }) =>
    this.request<void, any>({
      path: `/api/pull-requests/${variables.pullRequestId}/done`,
      method: 'PATCH',
      secure: true,
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags User API
   * @name GetMyInfo
   * @summary 유저 정보 조회
   * @request GET:/api/users/me
   */
  getMyInfo = (variables?: { params?: RequestParams }) =>
    this.request<UserReadResponseType, any>({
      path: `/api/users/me`,
      method: 'GET',
      format: 'json',
      ...variables?.params,
    });
  /**
   * No description
   *
   * @tags Repository API
   * @name GetRepositoryPullRequests
   * @summary 레포지토리 PR 리스트 반환
   * @request GET:/api/repositories/{repositoryId}/pull-requests
   * @secure
   */
  getRepositoryPullRequests = (variables: {
    repositoryId: number;
    query: {
      /**
       * 페이지 사이즈 크기
       * @format int32
       * @example 5
       */
      size: number;
      /**
       * 페이지 숫자
       * @format int32
       * @example 10
       */
      page: number;
    };
    params?: RequestParams;
  }) =>
    this.request<RepositoryPullRequestResponsesType, any>({
      path: `/api/repositories/${variables.repositoryId}/pull-requests`,
      method: 'GET',
      query: variables.query,
      secure: true,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Repository API
   * @name GetRepositoryEntirePullRequests
   * @summary 회원의 PR 리스트 반환
   * @request GET:/api/repositories/pull-requests
   * @secure
   */
  getRepositoryEntirePullRequests = (variables: {
    query: {
      /**
       * 페이지 사이즈 크기
       * @format int32
       * @example 5
       */
      size: number;
      /**
       * 페이지 숫자
       * @format int32
       * @example 10
       */
      page: number;
    };
    params?: RequestParams;
  }) =>
    this.request<RepositoryPullRequestResponsesType, any>({
      path: `/api/repositories/pull-requests`,
      method: 'GET',
      query: variables.query,
      secure: true,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Pull Request API
   * @name GetPullRequest
   * @summary PR 내역 조회
   * @request GET:/api/repositories/pull-requests/{pullRequestId}
   * @secure
   */
  getPullRequest = (variables: { pullRequestId: number; params?: RequestParams }) =>
    this.request<PullRequestReadResponseType, any>({
      path: `/api/repositories/pull-requests/${variables.pullRequestId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Repository API
   * @name GetMyRepositories
   * @summary 나의 레포지토리 목록 조회
   * @request GET:/api/repositories/me
   * @secure
   */
  getMyRepositories = (variables?: { params?: RequestParams }) =>
    this.request<MyRepositoriesResponseType, any>({
      path: `/api/repositories/me`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables?.params,
    });
  /**
   * No description
   *
   * @tags Pull Request API
   * @name GetDetailPullRequest
   * @summary PR 세부 내역 조회
   * @request GET:/api/pull-requests/{pullRequestId}
   * @secure
   */
  getDetailPullRequest = (variables: { pullRequestId: number; params?: RequestParams }) =>
    this.request<PullRequestDetailReadResponseType, any>({
      path: `/api/pull-requests/${variables.pullRequestId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Pull Request API
   * @name GetPullRequestRanking
   * @summary PR 회고 이어하기
   * @request GET:/api/pull-requests/ranking
   * @secure
   */
  getPullRequestRanking = (variables?: { params?: RequestParams }) =>
    this.request<PullRequestRankingResponsesType, any>({
      path: `/api/pull-requests/ranking`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables?.params,
    });
  /**
   * No description
   *
   * @tags ping-controller
   * @name Ping
   * @request GET:/api/ping
   */
  ping = (variables?: { params?: RequestParams }) =>
    this.request<string, any>({
      path: `/api/ping`,
      method: 'GET',
      format: 'json',
      ...variables?.params,
    });
  /**
   * No description
   *
   * @tags Repository API
   * @name DeleteRepositories
   * @summary 레포지토리 삭제
   * @request DELETE:/api/repositories/{repositoryId}
   * @secure
   */
  deleteRepositories = (variables: { repositoryId: number; params?: RequestParams }) =>
    this.request<void, any>({
      path: `/api/repositories/${variables.repositoryId}`,
      method: 'DELETE',
      secure: true,
      ...variables.params,
    });
}

export const apiApi = new ApiApi({ instance });
