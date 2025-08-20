import { HttpResponse, http } from 'msw';

import { ROUTES } from '@/constants/routes';
import getMyInfo from '@/mocks/responses/user/getMyInfo.json';

const userHandler = [
  http.get(`*${ROUTES.API.GET_MY_INFO}`, () => {
    return HttpResponse.json(getMyInfo, { status: 200 });
  }),
];

export default userHandler;
