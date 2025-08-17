import { type HttpHandler } from 'msw';

import repositoriesHandler from '@/mocks/handlers/repositoriesHandler';
import userHandler from '@/mocks/handlers/userHandler';

const handlers: HttpHandler[] = [...userHandler, ...repositoriesHandler];

export default handlers;
