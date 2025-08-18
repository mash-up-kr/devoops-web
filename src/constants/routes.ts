export const ROUTES = {
  PAGE: {
    HOME: '/',
    LANDING: '/landing',
    AUTH_GITHUB: '/auth/github',
    REPOLINK: '/repolink',
    RETROSPECTIVE: (pullRequestId: number) => `/retrospective/${pullRequestId}`,
  },
  API: {
    // Auth API
    LOGOUT_V1: '/api/v1/auth/logout',
    REISSUE_TOKEN_V1: '/api/v1/auth/github/refresh',
    LOGOUT: '/api/auth/logout',
    ISSUE_TOKEN: '/api/auth/github',
    REISSUE_TOKEN: '/api/auth/github/refresh',

    // Question API
    UPDATE_ALL_ANSWERS: '/api/questions/answer',
    CREATE_ANSWER: (questionId: number | string) => `/api/questions/${questionId}/answer`,
    DELETE_ANSWER: (answerId: number | string) => `/api/questions/answer/${answerId}`,
    UPDATE_ANSWER: (answerId: number | string) => `/api/questions/answer/${answerId}`,

    // GitHub API
    REGISTER_WEBHOOK: (repositoryId: number | string) => `/api/v1/github/repositories/${repositoryId}/webhooks`,

    // Repository API
    SAVE_REPOSITORY: '/api/repositories',
    REPOSITORY_PULL_REQUESTS: (repositoryId: number | string) => `/api/repositories/${repositoryId}/pull-requests`,
    ENTIRE_PULL_REQUESTS: '/api/repositories/pull-requests',
    MY_REPOSITORIES: '/api/repositories/me',
    DELETE_REPOSITORY: (repositoryId: number | string) => `/api/repositories/${repositoryId}`,

    // Pull Request API
    UPDATE_PULL_REQUEST_TO_DONE: (pullRequestId: number | string) => `/api/pull-requests/${pullRequestId}/done`,
    GET_PULL_REQUEST: (pullRequestId: number | string) => `/api/repositories/pull-requests/${pullRequestId}`,
    GET_DETAIL_PULL_REQUEST: (pullRequestId: number | string) => `/api/pull-requests/${pullRequestId}`,
    GET_PULL_REQUEST_RANKING: '/api/pull-requests/ranking',

    // User API
    GET_MY_INFO: '/api/users/me',

    // Ping API
    PING: '/api/ping',
  },
} as const;
