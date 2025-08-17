import { HttpResponse, http } from 'msw';

import { NO_PR_IN_REPOSITORY_ID } from '@/constants/domain';
import { ROUTES } from '@/constants/routes';
import getEntirePullRequests from '@/mocks/responses/repositories/getEntirePullRequests.json';
import getPullRequest from '@/mocks/responses/repositories/getPullRequest.json';
import getRepositoriesMe from '@/mocks/responses/repositories/getRepositoriesMe.json';
import getRepositoryPullRequests from '@/mocks/responses/repositories/getRepositoryPullRequests.json';

const repositoriesHandler = [
  http.get(`*${ROUTES.API.MY_REPOSITORIES}`, () => {
    return HttpResponse.json(getRepositoriesMe, { status: 200 });
  }),

  http.get(`*${ROUTES.API.REPOSITORY_PULL_REQUESTS(':repositoryId')}`, ({ params }) => {
    const { repositoryId } = params;

    if (Number(repositoryId) === NO_PR_IN_REPOSITORY_ID) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(getRepositoryPullRequests, { status: 200 });
  }),

  http.get(`*${ROUTES.API.ENTIRE_PULL_REQUESTS}`, () => {
    return HttpResponse.json(getEntirePullRequests, { status: 200 });
  }),

  http.get(`*${ROUTES.API.GET_PULL_REQUEST(':pullRequestId')}`, () => {
    return HttpResponse.json(getPullRequest, { status: 200 });
  }),
];

export default repositoriesHandler;
