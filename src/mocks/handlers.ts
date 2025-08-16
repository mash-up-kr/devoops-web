import { type HttpHandler } from 'msw';

import userHandler from '@/mocks/handlers/userHandler';

const handlers: HttpHandler[] = [...userHandler];

export default handlers;
