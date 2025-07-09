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
  AnswerPutResponsesType,
  AnswerSaveResponseType,
  AnswerUpdateRequestType,
  AnswerUpdateResponseType,
  PullRequestReadResponseType,
  RepositoryPullRequestResponsesType,
  RepositorySaveRequestType,
  RepositorySaveResponseType,
  UserSaveRequestType,
  UserSaveResponseType,
  UserTokenRefreshResponseType,
  UserType,
} from '../@types';

export class ApiApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags question-controller
   * @name UpdateAllAnswer
   * @request PUT:/api/questions/answer
   */
  updateAllAnswer = (variables: {
    query: {
      user: UserType;
    };
    data: AnswerPutRequestsType;
    params?: RequestParams;
  }) =>
    this.request<AnswerPutResponsesType, any>({
      path: `/api/questions/answer`,
      method: 'PUT',
      query: variables.query,
      body: variables.data,
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
   * @tags repository-controller
   * @name SaveRepository
   * @request POST:/api/repositories
   */
  saveRepository = (variables: {
    query: {
      user: UserType;
    };
    data: RepositorySaveRequestType;
    params?: RequestParams;
  }) =>
    this.request<RepositorySaveResponseType, any>({
      path: `/api/repositories`,
      method: 'POST',
      query: variables.query,
      body: variables.data,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags question-controller
   * @name CreateAnswer
   * @request POST:/api/questions/{questionId}/answer
   */
  createAnswer = (variables: {
    questionId: number;
    query: {
      user: UserType;
    };
    params?: RequestParams;
  }) =>
    this.request<AnswerSaveResponseType, any>({
      path: `/api/questions/${variables.questionId}/answer`,
      method: 'POST',
      query: variables.query,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Auth API
   * @name Logout
   * @request POST:/api/auth/logout
   */
  logout = (variables: {
    query: {
      user: UserType;
    };
    params?: RequestParams;
  }) =>
    this.request<void, any>({
      path: `/api/auth/logout`,
      method: 'POST',
      query: variables.query,
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags Auth API
   * @name IssueToken
   * @summary 회원 생성 & 토큰 발급
   * @request POST:/api/auth/github
   */
  issueToken = (variables: { data: UserSaveRequestType; params?: RequestParams }) =>
    this.request<UserSaveResponseType, any>({
      path: `/api/auth/github`,
      method: 'POST',
      body: variables.data,
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
   */
  reIssueToken = (variables?: { params?: RequestParams }) =>
    this.request<UserTokenRefreshResponseType, any>({
      path: `/api/auth/github/refresh`,
      method: 'POST',
      format: 'json',
      ...variables?.params,
    });
  /**
   * No description
   *
   * @tags question-controller
   * @name UpdateAnswer
   * @request DELETE:/api/questions/answer/{answerId}
   */
  updateAnswer = (variables: {
    answerId: number;
    query: {
      user: UserType;
    };
    params?: RequestParams;
  }) =>
    this.request<void, any>({
      path: `/api/questions/answer/${variables.answerId}`,
      method: 'DELETE',
      query: variables.query,
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags question-controller
   * @name UpdateAnswer1
   * @request PATCH:/api/questions/answer/{answerId}
   */
  1 = (variables: {
    answerId: number;
    query: {
      user: UserType;
    };
    data: AnswerUpdateRequestType;
    params?: RequestParams;
  }) =>
    this.request<AnswerUpdateResponseType, any>({
      path: `/api/questions/answer/${variables.answerId}`,
      method: 'PATCH',
      query: variables.query,
      body: variables.data,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags pull-request-controller
   * @name PullRequestUpdateToDone
   * @request PATCH:/api/pull-requests/{pullRequestId}/done
   */
  pullRequestUpdateToDone = (variables: {
    pullRequestId: number;
    query: {
      user: UserType;
    };
    params?: RequestParams;
  }) =>
    this.request<void, any>({
      path: `/api/pull-requests/${variables.pullRequestId}/done`,
      method: 'PATCH',
      query: variables.query,
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags repository-controller
   * @name GetRepositoryPullRequests
   * @request GET:/api/repositories/{repositoryId}/pull-requests
   */
  getRepositoryPullRequests = (variables: {
    repositoryId: number;
    query: {
      user: UserType;
      /** @format int32 */
      size: number;
      /** @format int32 */
      page: number;
    };
    params?: RequestParams;
  }) =>
    this.request<RepositoryPullRequestResponsesType, any>({
      path: `/api/repositories/${variables.repositoryId}/pull-requests`,
      method: 'GET',
      query: variables.query,
      format: 'json',
      ...variables.params,
    });
  /**
   * No description
   *
   * @tags pull-request-controller
   * @name GetPullRequest
   * @request GET:/api/pull-requests/{pullRequestId}
   */
  getPullRequest = (variables: {
    pullRequestId: number;
    query: {
      user: UserType;
    };
    params?: RequestParams;
  }) =>
    this.request<PullRequestReadResponseType, any>({
      path: `/api/pull-requests/${variables.pullRequestId}`,
      method: 'GET',
      query: variables.query,
      format: 'json',
      ...variables.params,
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
}

export const apiApi = new ApiApi({ instance });
